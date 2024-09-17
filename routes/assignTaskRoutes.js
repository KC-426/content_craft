import express from "express";
import {
  assignTask,
  getAssignedTasks,
} from "../controllers/assignTaskController.js";

const router = express();

router.route("/assign/task").post(assignTask);
router.route("/get/assigned/task").get(getAssignedTasks);

export default router;
