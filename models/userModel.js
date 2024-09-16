import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    profession: {
      type: String,
    },
    organization: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
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
    twoFactorSecret: String,
    isTwoFactorEnabled: { type: Boolean, default: false },
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

export default mongoose.model("User", userSchema);
