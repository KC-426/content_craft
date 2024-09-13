import consultWithAIModel from "../models/consultWithAIModel.js";
import { uploadConsultWithAIImagesToFirebaseStorage } from "../utils/helperFunctions.js";

export const addTechnialIssueSupport = async (req, res) => {
  try {
    const { consulationType, description } = req.body;
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const uploadedImages = await uploadConsultWithAIImagesToFirebaseStorage(req, res);

    const consultAI = await consultWithAIModel({
      consulationType,
      description,
      image: uploadedImages,
    });

    const result = await consultAI.save();
    return res
      .status(201)
      .json({ message: "Technical Issue Support saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
