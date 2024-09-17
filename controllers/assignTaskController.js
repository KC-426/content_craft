import assignTaskModel from "../models/assignTaskModel.js";
import { uploadAssignTaskImagesToFirebaseStorage } from "../utils/helperFunctions.js";

export const assignTask = async (req, res) => {
  try {
    const { title, dueDate, description, collaboratorId } = req.body;
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const uploadedImages = await uploadAssignTaskImagesToFirebaseStorage(
      req,
      res
    );

    const task = await assignTaskModel({
      title,
      dueDate,
      description,
      image: uploadedImages,
      collaboratorId,
    });

    const result = await task.save();
    return res.status(201).json({
      message: "Task is assigned successfully !",
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};

export const getAssignedTasks = async (req, res) => {
  try {
    const tasks = await assignTaskModel.find();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No task found." });
    }

    return res.status(200).json({
      message: "Task fetched successfully !",
      tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
