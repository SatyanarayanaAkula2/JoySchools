import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    heroSlides: {
      type: [String],
      default: [
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      ],
    },
    adminImage: {
      type: String,
      default: "/school_administrator.jpg",
    },
    email: {
      type: String,
      default: "info@joyemschool.edu",
    },
    phone: {
      type: String,
      default: "+91 80 4321 8765",
    },
    address: {
      type: String,
      default: "108 Joy Hills Road, Sector 4, Bangalore, 56054",
    },
    officeHours: {
      type: String,
      default: "Monday – Friday: 8:30 AM – 5:00 PM\nSaturday: 9:00 AM – 4:00 PM (Closed on Sundays)",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "https://www.instagram.com/joy_em_high_school/",
    },
    twitter: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
