import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"], // e.g. "Academic Excellence", "Sports & Athletics", "Environmental Leadership"
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"], // e.g. "2025 - 2026"
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model("Achievement", AchievementSchema);
