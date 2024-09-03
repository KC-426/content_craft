import express from "express"
import { addSubscribe } from "../controllers/subscribeController.js";

const router = express()

router.route("/add/subscribe").post(addSubscribe);

export default router