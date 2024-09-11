import express from "express"
import multer from "multer"

import { addTechnialIssueSupport } from "../controllers/technicalIssueSupportController.js";

const storage = multer.memoryStorage()
const upload = multer({
    storage, 
    limits: { fileSize: 10 * 1024 * 1024}
})

const router = express()

router.route("/add/technical/issue/support").post(upload.array("image"), addTechnialIssueSupport);

export default router