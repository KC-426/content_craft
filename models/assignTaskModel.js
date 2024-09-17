import mongoose from "mongoose";

const assignTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
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
    collaboratorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InviteCollaborator"
    }
  },
  { timestamps: true }
);

export default mongoose.model("AssignTask", assignTaskSchema);
