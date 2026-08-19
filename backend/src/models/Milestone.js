import mongoose from "mongoose";

const MilestoneSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    value: {
      type: String,
      required: [true, "Stat value is required"],
      trim: true,
    },
    label: {
      type: String,
      required: [true, "Stat label is required"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Milestone || mongoose.model("Milestone", MilestoneSchema);
