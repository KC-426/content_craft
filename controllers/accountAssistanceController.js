import acocuntAssistanceSupportModel from "../models/acocuntAssistanceSupportModel.js";
import { uploadAccountAssistanceSupportImagesToFirebaseStorage } from "../utils/helperFunctions.js";

export const addAccountAssitnace = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const uploadedImages = await uploadAccountAssistanceSupportImagesToFirebaseStorage(req, res);

    const acocuntAssistanceSupport = await acocuntAssistanceSupportModel({
      name,
      email,
      description,
      image: uploadedImages,
    });

    const result = await acocuntAssistanceSupport.save();
    return res
      .status(201)
      .json({ message: "Acocunt Assistance Support saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
