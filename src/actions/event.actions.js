"use server";

import { revalidatePath } from "next/cache";
import { eventSchema } from "@/validators/event.validators";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/services/event.service";
import { uploadImage } from "@/lib/cloudinary";
import { getCurrentAdmin } from "./auth.actions";

async function verifyAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized. Please log in.");
  }
}

/**
 * Public/Admin action to fetch the events list.
 */
export async function fetchEvents(filters) {
  try {
    const list = await getEvents(filters);
    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    console.error("fetchEvents action error:", error);
    throw new Error(error.message || "Failed to fetch events");
  }
}

/**
 * Server Action to save (create or update) an event's details.
 * Accepts FormData for potential file uploads.
 */
export async function saveEventAction(formData) {
  try {
    await verifyAuth();
    
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const category = formData.get("category");
    const imageFile = formData.get("imageFile");
    const existingImage = formData.get("existingImage") || "";
    
    let imageUrl = existingImage;
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "joyschools/events");
    }
    
    const validated = eventSchema.parse({
      title,
      description,
      date,
      category,
      image: imageUrl,
    });
    
    let result;
    if (id) {
      result = await updateEvent(id, validated);
    } else {
      result = await createEvent(validated);
    }
    
    revalidatePath("/");
    revalidatePath("/admin/events");
    
    return { success: true, event: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("saveEventAction error:", error);
    return { success: false, error: error.message || "Failed to save event details" };
  }
}

export async function removeEvent(id) {
  try {
    await verifyAuth();
    await deleteEvent(id);
    
    revalidatePath("/");
    revalidatePath("/admin/events");
    
    return { success: true };
  } catch (error) {
    console.error("removeEvent action error:", error);
    return { success: false, error: error.message || "Failed to delete event" };
  }
}
