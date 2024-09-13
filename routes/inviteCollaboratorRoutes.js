import express from "express"

import { createInviteCollaborator, getAllCollaborators } from "../controllers/inviteCollaboratorController.js";

const router = express()

router.route("/add/invite/collaborator").post(createInviteCollaborator);
router.route("/get/collaborators").get(getAllCollaborators);


export default router