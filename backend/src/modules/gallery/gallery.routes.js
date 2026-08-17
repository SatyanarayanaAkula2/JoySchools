import express from "express";
import { fetchGalleryItems, addGalleryItem, editGalleryItem, removeGalleryItem } from "./gallery.controller.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Public routes
router.get("/", fetchGalleryItems);

// Protected routes (Admin only)
router.post("/", protectAdmin, upload.single("imageFile"), addGalleryItem);
router.put("/:id", protectAdmin, upload.single("imageFile"), editGalleryItem);
router.delete("/:id", protectAdmin, removeGalleryItem);

export default router;
