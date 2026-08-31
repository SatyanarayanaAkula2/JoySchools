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
    email: {
      type: String,
      default: "joyschoolkkd@gmail.com",
      trim: true,
      lowercase: true,
    },
    resetOtp: {
      type: String,
      default: null,
    },
    resetOtpExpiry: {
      type: Date,
      default: null,
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    securityQuestion: {
      type: String,
      default: "what is adminId",
    },
    securityAnswer: {
      type: String,
      default: "joyschool@123",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
