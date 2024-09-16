import express from "express"
import { addFeaturedDocuments, addFeaturedProjects, addFeaturedResources, getFeaturedDocuments, getFeaturedProjects, getFeaturedResources } from "../controllers/featuredContentController.js";

const router = express()

router.route("/add/featured/project").post(addFeaturedProjects);
router.route("/get/featured/projects").get(getFeaturedProjects);
router.route("/add/featured/document").post(addFeaturedDocuments);
router.route("/get/featured/documents").get(getFeaturedDocuments);
router.route("/add/featured/resource").post(addFeaturedResources);
router.route("/get/featured/resources").get(getFeaturedResources);


export default router