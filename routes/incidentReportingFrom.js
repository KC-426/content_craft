import express from "express"
import multer from "multer"

import { addIncidentReportingForm } from "../controllers/incidentReportingFormController.js";

const storage = multer.memoryStorage()
const upload = multer({
    storage, 
    limits: { fileSize: 10 * 1024 * 1024}
})

const router = express()

router.route("/add/incident/report/form").post(upload.array("image"), addIncidentReportingForm);

export default router