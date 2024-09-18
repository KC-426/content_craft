import express from "express"
import multer from "multer"
import { deleteUser, fetchUserProfile, generateQrAndSecretKey, logoutUser, sendOtp, updateUserProfile, userLogin, userProfile, userSignup, validate2FALogin, verify2FASecret, verifyOtpAndUpdateEmail, verifyOtpAndUpdatePassword } from "../controllers/userController.js"

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
})

const router = express()

router.route("/user/signup").post(userSignup);
router.route("/user/login").post(userLogin);
router.route("/complete/user/:userId").post(upload.single("image"), userProfile);
router.route("/fetch/user/:userId").get(fetchUserProfile);
router.route("/delete/user/:userId").delete(deleteUser);
router.route("/update/user/:userId").put(upload.single('image'), updateUserProfile);
router.route("/logout/user").post(logoutUser);
router.route("/generate/secretkey/qr").post(generateQrAndSecretKey);
router.route("/verify/secretkey").post(verify2FASecret);
router.route("/validate/twofactor/login").post(validate2FALogin);
router.route("/send/otp/:userId").post(sendOtp);
router.route("/update/email/:userId").put(verifyOtpAndUpdateEmail);
router.route("/update/password/:userId").put(verifyOtpAndUpdatePassword);








export default router