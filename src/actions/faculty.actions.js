"use server";

import { revalidatePath } from "next/cache";
import { facultySchema } from "@/validators/faculty.validators";
import {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "@/services/faculty.service";
import { uploadImage } from "@/lib/cloudinary";
import { getCurrentAdmin } from "./auth.actions";

async function verifyAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized. Please log in.");
  }
}

/**
 * Public/Admin action to fetch the faculty list.
 */
export async function fetchFaculty() {
  try {
    const list = await getFaculty();
    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    console.error("fetchFaculty action error:", error);
    throw new Error(error.message || "Failed to fetch faculty");
  }
}

/**
 * Server Action to save (create or update) a faculty member's record.
 * Accepts FormData for file uploads.
 */
export async function saveFacultyAction(formData) {
  try {
    await verifyAuth();
    
    const id = formData.get("id");
    const name = formData.get("name");
    const role = formData.get("role");
    const qualification = formData.get("qualification");
    const experience = formData.get("experience");
    const email = formData.get("email");
    const orderStr = formData.get("order");
    const imageFile = formData.get("imageFile");
    const existingImage = formData.get("existingImage") || "";
    
    const order = orderStr ? parseInt(orderStr, 10) : 0;
    
    // Handle Cloudinary upload if a new image file is provided
    let imageUrl = existingImage;
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "joyschools/faculty");
    }
    
    const validated = facultySchema.parse({
      name,
      role,
      qualification,
      experience,
      email,
      image: imageUrl,
      order,
    });
    
    let result;
    if (id) {
      result = await updateFaculty(id, validated);
    } else {
      result = await createFaculty(validated);
    }
    
    revalidatePath("/");
    revalidatePath("/admin/faculty");
    
    return { success: true, faculty: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("saveFacultyAction error:", error);
    return { success: false, error: error.message || "Failed to save faculty details" };
  }
}

export async function removeFaculty(id) {
  try {
    await verifyAuth();
    await deleteFaculty(id);
    
    revalidatePath("/");
    revalidatePath("/admin/faculty");
    
    return { success: true };
  } catch (error) {
    console.error("removeFaculty action error:", error);
    return { success: false, error: error.message || "Failed to delete faculty" };
  }
}
