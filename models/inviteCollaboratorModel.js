import mongoose from "mongoose";

const inviteCollaboratorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['invite request', 'accept', 'reject'],
      default: 'invite request'
    },
    chats: [
      {
        chatMessage: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now  
        }
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("InviteCollaborator", inviteCollaboratorSchema);
