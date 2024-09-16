import express from "express"
import userAuth from "../middleware/auth.js"
import { acceptCollaboratorInvite, chatWithCollaborator, createInviteCollaborator, getAllCollaborators } from "../controllers/inviteCollaboratorController.js";

const router = express()

router.route("/invite/collaborator").post(createInviteCollaborator);
router.route("/get/collaborators").get(getAllCollaborators);
router.route("/chat/collaborator/:collaboratorId").post(userAuth, chatWithCollaborator);
router.route("/accept/collaborator/invite/:collaboratorId").patch(acceptCollaboratorInvite);




export default router