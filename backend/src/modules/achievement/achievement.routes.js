import express from "express";
import { fetchAchievements, addAchievement, editAchievement, removeAchievement } from "./achievement.controller.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Public routes
router.get("/", fetchAchievements);

// Protected routes (Admin only)
router.post("/", protectAdmin, upload.single("imageFile"), addAchievement);
router.put("/:id", protectAdmin, upload.single("imageFile"), editAchievement);
router.delete("/:id", protectAdmin, removeAchievement);

export default router;
