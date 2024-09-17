import userSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  deleteImageFromFirebaseStorage,
  uploadUserProfileImageToFirebaseStorage,
} from "../utils/helperFunctions.js";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

dotenv.config({ path: "config/.env" });

export const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    const user = await userSchema.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists, please login!" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password should match!" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    const newUser = new userSchema({
      firstName,
      lastName,
      email,
      password: hashedPwd,
    });

    const result = await newUser.save();

    return res.status(200).json({ message: "Signup successful!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found, please signup !" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Login successful !", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const userProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "No user found !" });
    }

    const { profession, organization, description } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(404).json({ message: "profileImage required !" });
    }

    const imageUrl = await uploadUserProfileImageToFirebaseStorage(req, res);

    (user.profession = profession),
      (user.organization = organization),
      (user.description = description),
      (user.image = imageUrl);

    await user.save();

    return res
      .status(200)
      .json({ message: "User Profile completed successfully !", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const fetchUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found !" });
    }

    return res
      .status(200)
      .json({ message: "User fetched successfully !", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found !" });
    }

    if (user.image && user.image.url) {
      await deleteImageFromFirebaseStorage(user.image.url);
    }

    await userSchema.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User profile deleted !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const { fullName, description, profession, organization } = req.body;
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.image && user.image.url) {
      await deleteImageFromFirebaseStorage(user.image.url);
    }

    const imageUrl = await uploadUserProfileImageToFirebaseStorage(req, res);
    user.image = imageUrl;

    user.fullName = fullName || user.fullName;
    user.description = description || user.description;
    user.profession = profession || user.profession;
    user.organization = organization || user.organization;

    await user.save();

    res.status(200).json({ message: "User profile updated!", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(0),
    });

    res.status(200).json({ message: "logout successfull !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const generateQrAndSecretKey = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate the secret and manually create the otpauth URL
    const secret = speakeasy.generateSecret({ length: 20 });
    const otpauthUrl = `otpauth://totp/${encodeURIComponent(
      user.email
    )}?secret=${secret.base32}&issuer=ContentCraft-AI`;

    user.twoFactorSecret = secret.base32;
    await user.save();

    // Generate the QR code from the otpauth URL
    const qrCodeUrl = await qrcode.toDataURL(otpauthUrl);

    return res.json({ qrCodeUrl, secret: secret.base32 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verify2FASecret = async (req, res) => {
  const { userId, token } = req.body;

  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (verified) {
      user.isTwoFactorEnabled = true;
      await user.save();
      return res.json({ message: "2FA setup successful" });
    } else {
      return res.status(400).json({ message: "Invalid 2FA token" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const validate2FALogin = async (req, res) => {
  const { email, password, token } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isTwoFactorEnabled) {
      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token,
      });

      if (!verified) {
        return res.status(400).json({ message: "Invalid 2FA token" });
      }
    }

    // Proceed with login (e.g., generate JWT)
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
