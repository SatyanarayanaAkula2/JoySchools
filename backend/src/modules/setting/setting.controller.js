import * as settingService from "./setting.service.js";
import { uploadImage } from "../../config/cloudinary.js";

export async function fetchSettings(req, res) {
  try {
    const doc = await settingService.getSettings();
    return res.status(200).json({ success: true, settings: doc });
  } catch (error) {
    console.error("fetchSettings controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch settings" });
  }
}

export async function editSettings(req, res) {
  try {
    const current = await settingService.getSettings();
    
    const updateData = {
      email: req.body.email !== undefined ? req.body.email : current.email,
      phone: req.body.phone !== undefined ? req.body.phone : current.phone,
      address: req.body.address !== undefined ? req.body.address : current.address,
      facebook: req.body.facebook !== undefined ? req.body.facebook : current.facebook,
      instagram: req.body.instagram !== undefined ? req.body.instagram : current.instagram,
      twitter: req.body.twitter !== undefined ? req.body.twitter : current.twitter,
      youtube: req.body.youtube !== undefined ? req.body.youtube : current.youtube,
      mapEmbedUrl: req.body.mapEmbedUrl !== undefined ? req.body.mapEmbedUrl : current.mapEmbedUrl,
    };

    // Handle single admin image upload
    let adminImage = req.body.existingAdminImage || current.adminImage;
    if (req.files && req.files.adminImageFile && req.files.adminImageFile[0]) {
      adminImage = await uploadImage(req.files.adminImageFile[0].buffer, "joyschools/settings");
    }
    updateData.adminImage = adminImage;

    // Handle 4 Hero slides uploads
    const heroSlides = [...(current.heroSlides || [])];
    
    const slideFields = ["heroSlideFile1", "heroSlideFile2", "heroSlideFile3", "heroSlideFile4"];
    for (let i = 0; i < 4; i++) {
      const field = slideFields[i];
      if (req.files && req.files[field] && req.files[field][0]) {
        heroSlides[i] = await uploadImage(req.files[field][0].buffer, "joyschools/settings");
      } else {
        const bodyExisting = req.body[`existingHeroSlide${i + 1}`];
        if (bodyExisting !== undefined) {
          heroSlides[i] = bodyExisting;
        }
      }
    }
    updateData.heroSlides = heroSlides;

    const saved = await settingService.updateSettings(updateData);
    return res.status(200).json({ success: true, settings: saved });
  } catch (error) {
    console.error("editSettings controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to update configuration settings" });
  }
}
