import express from "express"

import { createInviteCollaborator } from "../controllers/inviteCollaboratorController.js";

const router = express()

router.route("/add/invite/collaborator").post(createInviteCollaborator);

export default router