import express from "express"
import { addProject, deleteProject, getProjects } from "../controllers/projectController.js";

const router = express()

router.route("/add/project").post(addProject);
router.route("/get/projects").get(getProjects);
router.route("/delete/project/:projectId").delete(deleteProject);


export default router