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
      default: "info@joyemhighschool.edu",
    },
    phone: {
      type: String,
      default: "+91 80 4321 8765",
    },
    address: {
      type: String,
      default: "108 Joy Hills Road, Sector 4, Bangalore, 56054",
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
    mapEmbedUrl: {
      type: String,
      default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9265147814876!2d77.62193527589999!3d12.976594214751433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1680d22c0389%3A0x7d028b030e427187!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
