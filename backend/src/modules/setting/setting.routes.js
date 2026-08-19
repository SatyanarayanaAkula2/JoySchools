import express from "express";
import { fetchSettings, editSettings } from "./setting.controller.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "adminImageFile", maxCount: 1 },
  { name: "heroSlideFile1", maxCount: 1 },
  { name: "heroSlideFile2", maxCount: 1 },
  { name: "heroSlideFile3", maxCount: 1 },
  { name: "heroSlideFile4", maxCount: 1 },
]);

// Public routes
router.get("/", fetchSettings);

// Protected routes (Admin only)
router.put("/", protectAdmin, uploadFields, editSettings);

export default router;
