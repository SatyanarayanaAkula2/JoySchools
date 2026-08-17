import * as achievementService from "./achievement.service.js";
import { uploadImage } from "../../config/cloudinary.js";
import { achievementSchema } from "./achievement.validators.js";

export async function fetchAchievements(req, res) {
  try {
    const list = await achievementService.getAchievements();
    return res.status(200).json({ success: true, achievements: list });
  } catch (error) {
    console.error("fetchAchievements controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch achievements" });
  }
}

export async function addAchievement(req, res) {
  try {
    let imageUrl = req.body.image || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/achievements");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    const validated = achievementSchema.parse(payload);
    const item = await achievementService.createAchievement(validated);

    return res.status(201).json({ success: true, achievement: item });
  } catch (error) {
    console.error("addAchievement controller error:", error);
    const errorMsg = error.errors ? error.errors.map(e => e.message).join(", ") : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to add achievement" });
  }
}

export async function editAchievement(req, res) {
  try {
    const { id } = req.params;
    
    let imageUrl = req.body.image || req.body.existingImage || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/achievements");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    const validated = achievementSchema.parse(payload);
    const item = await achievementService.updateAchievement(id, validated);

    if (!item) {
      return res.status(404).json({ success: false, error: "Achievement not found" });
    }

    return res.status(200).json({ success: true, achievement: item });
  } catch (error) {
    console.error("editAchievement controller error:", error);
    const errorMsg = error.errors ? error.errors.map(e => e.message).join(", ") : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to update achievement" });
  }
}

export async function removeAchievement(req, res) {
  try {
    const { id } = req.params;
    await achievementService.deleteAchievement(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeAchievement controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete achievement" });
  }
}
