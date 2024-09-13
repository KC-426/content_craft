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

export const getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await inviteCollaboratorModel.find()

    if(!collaborators || collaborators.length == 0){
      return res.status(404).json({message: "No collaborator found !"})
    }

    return res
      .status(200)
      .json({ message: "All Collaborators fetced successfully !", collaborators });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};



export const chatWithCollaborator = async (req, res) => {
  try {
    const collaborators = await inviteCollaboratorModel.find()

    if(!collaborators || collaborators.length == 0){
      return res.status(404).json({message: "No collaborator found !"})
    }

    return res
      .status(200)
      .json({ message: "All Collaborators fetced successfully !", collaborators });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};