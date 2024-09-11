import supportFormModel from "../models/supportFormModel.js";

export const createSupportForm = async (req, res) => {
  try {
    const { name, email, subject, description } = req.body

    const supportForm = await supportFormModel({
      name,
      email,
      subject,
      description,
    });

    const result = await supportForm.save();
    return res
      .status(201)
      .json({ message: "Support From saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
