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
    securityQuestion: {
      type: String,
      default: "What is your primary school name?",
    },
    securityAnswer: {
      type: String,
      default: "joyschool@123",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
