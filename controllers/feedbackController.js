import feedbackModel from "../models/feedbackModel.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, description } = req.body

    const feedback = await feedbackModel({
      name,
      email,
      description,
    });

    const result = await feedback.save();
    return res
      .status(201)
      .json({ message: "Feedback saved successfully !", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
};
