"use server";

import { revalidatePath } from "next/cache";
import { achievementSchema } from "@/validators/achievement.validators";
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "@/services/achievement.service";
import { uploadImage } from "@/lib/cloudinary";
import { getCurrentAdmin } from "./auth.actions";

async function verifyAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized. Please log in.");
  }
}

/**
 * Public/Admin action to fetch achievements list.
 */
export async function fetchAchievements() {
  try {
    const list = await getAchievements();
    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    console.error("fetchAchievements action error:", error);
    throw new Error(error.message || "Failed to fetch achievements");
  }
}

/**
 * Server Action to save (create or update) an achievement.
 * Accepts FormData for file uploads.
 */
export async function saveAchievementAction(formData) {
  try {
    await verifyAuth();
    
    const id = formData.get("id");
    const title = formData.get("title");
    const category = formData.get("category");
    const year = formData.get("year");
    const description = formData.get("description");
    const imageFile = formData.get("imageFile");
    const existingImage = formData.get("existingImage") || "";
    
    let imageUrl = existingImage;
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "joyschools/achievements");
    }
    
    const validated = achievementSchema.parse({
      title,
      category,
      year,
      description,
      image: imageUrl,
    });
    
    let result;
    if (id) {
      result = await updateAchievement(id, validated);
    } else {
      result = await createAchievement(validated);
    }
    
    revalidatePath("/");
    revalidatePath("/admin/achievements");
    
    return { success: true, achievement: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("saveAchievementAction error:", error);
    return { success: false, error: error.message || "Failed to save achievement" };
  }
}

export async function removeAchievement(id) {
  try {
    await verifyAuth();
    await deleteAchievement(id);
    
    revalidatePath("/");
    revalidatePath("/admin/achievements");
    
    return { success: true };
  } catch (error) {
    console.error("removeAchievement action error:", error);
    return { success: false, error: error.message || "Failed to delete achievement" };
  }
}
