import express from "express"
import { createFeedback } from "../controllers/feedbackController.js";

const router = express()

router.route("/add/feedback").post(createFeedback);

export default router