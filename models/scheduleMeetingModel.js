import mongoose from "mongoose";

const scheduleMeetingSchema = new mongoose.Schema(
  {
    meetingTitle: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    inviteCollaborator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InviteCollaborator",
      required: true
    },
    link: {
      type: String,
      required: true,
    },
    meetingAgenda: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Schedule Meeting", scheduleMeetingSchema);
