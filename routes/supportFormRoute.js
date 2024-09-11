import express from "express"
import { createSupportForm } from "../controllers/supportFormController.js";

const router = express()

router.route("/add/support/form").post(createSupportForm);

export default router