import userSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  deleteImageFromFirebaseStorage,
  uploadUserProfileImageToFirebaseStorage,
} from "../utils/helperFunctions.js";

dotenv.config({ path: "config/.env" });

export const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist please login !" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword should match !" });
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    const newUser = new userSchema({
      fullName,
      email,
      password: hashedPwd,
    });

    const result = await newUser.save();

    return res.status(200).json({ message: "Signup successful!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
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
    const { fullName, email, description, profession, organization } = req.body;
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
    user.email = email || user.email;
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
