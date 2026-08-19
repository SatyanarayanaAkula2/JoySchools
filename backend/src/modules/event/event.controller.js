import * as eventService from "./event.service.js";
import { uploadImage } from "../../config/cloudinary.js";
import { eventSchema } from "./event.validators.js";

export async function fetchEvents(req, res) {
  try {
    const list = await eventService.getEvents();
    return res.status(200).json({ success: true, events: list });
  } catch (error) {
    console.error("fetchEvents controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch event list" });
  }
}

export async function addEvent(req, res) {
  try {
    let imageUrl = req.body.image || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/events");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    const validated = eventSchema.parse(payload);
    const item = await eventService.createEvent(validated);

    return res.status(201).json({ success: true, event: item });
  } catch (error) {
    console.error("addEvent controller error:", error);
    const errorMsg = error.errors
      ? (Array.isArray(error.errors)
          ? error.errors.map(e => e.message).join(", ")
          : Object.values(error.errors).map(e => e.message || String(e)).join(", "))
      : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to add event" });
  }
}

export async function editEvent(req, res) {
  try {
    const { id } = req.params;
    
    let imageUrl = req.body.image || req.body.existingImage || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/events");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    const validated = eventSchema.parse(payload);
    const item = await eventService.updateEvent(id, validated);

    if (!item) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    return res.status(200).json({ success: true, event: item });
  } catch (error) {
    console.error("editEvent controller error:", error);
    const errorMsg = error.errors
      ? (Array.isArray(error.errors)
          ? error.errors.map(e => e.message).join(", ")
          : Object.values(error.errors).map(e => e.message || String(e)).join(", "))
      : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to update event" });
  }
}

export async function removeEvent(req, res) {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeEvent controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete event" });
  }
}
