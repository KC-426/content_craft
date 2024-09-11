import mongoose from "mongoose";

const assountAssistanceSupportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [{
      name: {
        type: String,
      },
      path: {
        type: String,
      },
      url: {
        type: String,
      },
    }],
  },
  { timestamps: true }
);

export default mongoose.model(
  "AssountAssistanceSupport",
  assountAssistanceSupportSchema
);
