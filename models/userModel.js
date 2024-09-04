import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
