"use server";

import { revalidatePath } from "next/cache";
import { gallerySchema } from "@/validators/gallery.validators";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/services/gallery.service";
import { uploadImage } from "@/lib/cloudinary";
import { getCurrentAdmin } from "./auth.actions";

async function verifyAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized. Please log in.");
  }
}

/**
 * Public/Admin action to fetch the gallery list.
 */
export async function fetchGalleryItems(filters) {
  try {
    const list = await getGalleryItems(filters);
    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    console.error("fetchGalleryItems action error:", error);
    throw new Error(error.message || "Failed to fetch gallery items");
  }
}

/**
 * Server Action to save (create or update) a gallery item.
 * Accepts FormData for potential file uploads.
 */
export async function saveGalleryAction(formData) {
  try {
    await verifyAuth();
    
    const id = formData.get("id");
    const title = formData.get("title");
    const album = formData.get("album");
    const description = formData.get("description");
    const imageFile = formData.get("imageFile");
    const existingImage = formData.get("existingImage") || "";
    
    let imageUrl = existingImage;
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "joyschools/gallery");
    }
    
    if (!imageUrl) {
      throw new Error("Image file is required for new gallery entries");
    }
    
    const validated = gallerySchema.parse({
      title,
      album,
      description,
      image: imageUrl,
    });
    
    let result;
    if (id) {
      result = await updateGalleryItem(id, validated);
    } else {
      result = await createGalleryItem(validated);
    }
    
    revalidatePath("/");
    revalidatePath("/admin/gallery");
    
    return { success: true, item: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("saveGalleryAction error:", error);
    return { success: false, error: error.message || "Failed to save gallery item" };
  }
}

export async function removeGalleryItem(id) {
  try {
    await verifyAuth();
    await deleteGalleryItem(id);
    
    revalidatePath("/");
    revalidatePath("/admin/gallery");
    
    return { success: true };
  } catch (error) {
    console.error("removeGalleryItem action error:", error);
    return { success: false, error: error.message || "Failed to delete gallery item" };
  }
}
