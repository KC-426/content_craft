import contentGenerationIssueModel from "../models/contentGenerationIssueModel.js";
import { uploadContentGenerationIssueSupportImagesToFirebaseStorage } from "../utils/helperFunctions.js";

export const addContentGenerationIssue = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const uploadedImages = await uploadContentGenerationIssueSupportImagesToFirebaseStorage(req, res);

    const contentGenerationIssueSupport = await contentGenerationIssueModel({
      name,
      email,
      description,
      image: uploadedImages,
    });

    const result = await contentGenerationIssueSupport.save();
    return res
      .status(201)
      .json({ message: "Content Generation Issue Support saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
