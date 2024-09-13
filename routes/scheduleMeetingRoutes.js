import express from "express"
import { scheduleMeeting } from "../controllers/scheduleMeetingController.js";

const router = express()

router.route("/schedule/meeting").post(scheduleMeeting);

export default router