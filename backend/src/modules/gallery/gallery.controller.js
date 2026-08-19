import * as galleryService from "./gallery.service.js";
import { uploadImage } from "../../config/cloudinary.js";
import { gallerySchema } from "./gallery.validators.js";

export async function fetchGalleryItems(req, res) {
  try {
    const list = await galleryService.getGalleryItems();
    return res.status(200).json({ success: true, gallery: list });
  } catch (error) {
    console.error("fetchGalleryItems controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch gallery list" });
  }
}

export async function addGalleryItem(req, res) {
  try {
    let imageUrl = req.body.image || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/gallery");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    const validated = gallerySchema.parse(payload);
    const item = await galleryService.createGalleryItem(validated);

    return res.status(201).json({ success: true, item });
  } catch (error) {
    console.error("addGalleryItem controller error:", error);
    const errorMsg = error.errors
      ? (Array.isArray(error.errors)
          ? error.errors.map(e => e.message).join(", ")
          : Object.values(error.errors).map(e => e.message || String(e)).join(", "))
      : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to add gallery item" });
  }
}

export async function editGalleryItem(req, res) {
  try {
    const { id } = req.params;
    
    let imageUrl = req.body.image || req.body.existingImage || "";
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer, "joyschools/gallery");
    }

    const payload = {
      ...req.body,
      image: imageUrl,
    };

    const validated = gallerySchema.parse(payload);
    const item = await galleryService.updateGalleryItem(id, validated);

    if (!item) {
      return res.status(404).json({ success: false, error: "Gallery item not found" });
    }

    return res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("editGalleryItem controller error:", error);
    const errorMsg = error.errors
      ? (Array.isArray(error.errors)
          ? error.errors.map(e => e.message).join(", ")
          : Object.values(error.errors).map(e => e.message || String(e)).join(", "))
      : error.message;
    return res.status(400).json({ success: false, error: errorMsg || "Failed to update gallery item" });
  }
}

export async function removeGalleryItem(req, res) {
  try {
    const { id } = req.params;
    await galleryService.deleteGalleryItem(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeGalleryItem controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete gallery item" });
  }
}
