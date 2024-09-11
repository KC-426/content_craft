import express from "express"
import multer from "multer"

import { addAccountAssitnace } from "../controllers/accountAssistanceController.js";

const storage = multer.memoryStorage()
const upload = multer({
    storage, 
    limits: { fileSize: 10 * 1024 * 1024}
})

const router = express()

router.route("/add/account/assistance/support").post(upload.array("image"), addAccountAssitnace);

export default router