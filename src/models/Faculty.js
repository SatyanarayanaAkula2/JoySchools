import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role/Designation is required"],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0, // For custom sorting on the public website
    },
  },
  { timestamps: true }
);

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
