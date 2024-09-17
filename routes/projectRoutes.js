import express from "express"
import { addProject, deleteProject, getProjects } from "../controllers/projectController.js";

const router = express()

router.route("/add/project").post(addProject);
router.route("/get/project").get(getProjects);
router.route("/delete/project/:projectId").delete(deleteProject);


export default router