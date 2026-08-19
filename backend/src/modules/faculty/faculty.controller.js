import * as facultyService from "./faculty.service.js";
import { uploadImage } from "../../config/cloudinary.js";
import { facultySchema } from "./faculty.validators.js";

export async function fetchFaculty(req, res) {
  try {
    const list = await facultyService.getFaculty();
    return res.status(200).json({ success: true, faculty: list });
  } catch (error) {
    console.error("fetchFaculty controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch faculty list" });
  }
}

export async function addFaculty(req, res) {
  try {
    let imageUrl = req.body.image || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/faculty");
    }

    // Prepare body for zod validation
    const payload = {
      ...req.body,
      image: imageUrl,
    };

    // Parse order if string
    if (payload.order !== undefined && typeof payload.order === "string") {
      const parsed = parseInt(payload.order, 10);
      payload.order = isNaN(parsed) ? 0 : parsed;
    }

    const validated = facultySchema.parse(payload);
    const item = await facultyService.createFaculty(validated);

    return res.status(201).json({ success: true, faculty: item });
  } catch (error) {
    console.error("addFaculty controller error:", error);
    const errorMsg = error.errors
      ? (Array.isArray(error.errors)
          ? error.errors.map(e => e.message).join(", ")
          : Object.values(error.errors).map(e => e.message || String(e)).join(", "))
      : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to add faculty profile" });
  }
}

export async function editFaculty(req, res) {
  try {
    const { id } = req.params;
    
    let imageUrl = req.body.image || req.body.existingImage || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/faculty");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    // Parse order if string
    if (payload.order !== undefined && typeof payload.order === "string") {
      const parsed = parseInt(payload.order, 10);
      payload.order = isNaN(parsed) ? 0 : parsed;
    }

    const validated = facultySchema.parse(payload);
    const item = await facultyService.updateFaculty(id, validated);

    if (!item) {
      return res.status(404).json({ success: false, error: "Faculty member not found" });
    }

    return res.status(200).json({ success: true, faculty: item });
  } catch (error) {
    console.error("editFaculty controller error:", error);
    const errorMsg = error.errors
      ? (Array.isArray(error.errors)
          ? error.errors.map(e => e.message).join(", ")
          : Object.values(error.errors).map(e => e.message || String(e)).join(", "))
      : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to update faculty profile" });
  }
}

export async function removeFaculty(req, res) {
  try {
    const { id } = req.params;
    await facultyService.deleteFaculty(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeFaculty controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete faculty member" });
  }
}
