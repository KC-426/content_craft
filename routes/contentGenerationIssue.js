import express from "express"
import multer from "multer"

import { addContentGenerationIssue } from "../controllers/contentGenerationIssue.js";

const storage = multer.memoryStorage()
const upload = multer({
    storage, 
    limits: { fileSize: 10 * 1024 * 1024}
})

const router = express()

router.route("/add/content/generation/issue/support").post(upload.array("image"), addContentGenerationIssue);

export default router