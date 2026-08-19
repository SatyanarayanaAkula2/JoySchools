import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "admin",
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    securityQuestion: {
      type: String,
      default: "What is your primary school name?",
    },
    securityAnswer: {
      type: String,
      required: [true, "Security answer is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
