import inviteCollaboratorModel from "../models/inviteCollaboratorModel.js";

export const createInviteCollaborator = async (req, res) => {
  try {
    const { name, email, message } = req.body

    const inviteCollaborator = await inviteCollaboratorModel({
      name,
      email,
      message,
    });

    const result = await inviteCollaborator.save();
    return res
      .status(201)
      .json({ message: "Invite Collaborator saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
