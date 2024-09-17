import express from "express";
import multer from "multer";
import {
  assignTask,
  getAssignedTasks,
} from "../controllers/assignTaskController.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = express();

router.route("/assign/task").post(upload.array('image'), assignTask);
router.route("/get/assigned/task").get(getAssignedTasks);

export default router;
