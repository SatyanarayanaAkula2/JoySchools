import express from "express";
import { fetchFaculty, addFaculty, editFaculty, removeFaculty } from "./faculty.controller.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Public routes
router.get("/", fetchFaculty);

// Protected routes (Admin only)
router.post("/", protectAdmin, upload.single("imageFile"), addFaculty);
router.put("/:id", protectAdmin, upload.single("imageFile"), editFaculty);
router.delete("/:id", protectAdmin, removeFaculty);

export default router;
