import mongoose from "mongoose";

const consultWithAISchema = new mongoose.Schema(
  {
    consulationType: {
      type: String,
      enum: ["Content Strategy", "Writing Assistance", "SEO Consultation"],
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        name: {
          type: String,
        },
        path: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ConsultWithAI", consultWithAISchema);
