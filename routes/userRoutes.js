import express from "express"
import multer from "multer"
import { deleteUser, fetchUserProfile, updateUserProfile, userLogin, userProfile, userSignup } from "../controllers/userController.js"

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




export default router