import incidentReportingFormModel from "../models/incidentReportingFormModel.js";
import { uploadIncidentReportImagesToFirebaseStorage } from "../utils/helperFunctions.js";

export const addIncidentReportingForm = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const uploadedImages = await uploadIncidentReportImagesToFirebaseStorage(req, res);

    const newIncident = await incidentReportingFormModel({
      name,
      email,
      description,
      image: uploadedImages,
    });

    const result = await newIncident.save();
    return res
      .status(201)
      .json({ message: "Incident report saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
