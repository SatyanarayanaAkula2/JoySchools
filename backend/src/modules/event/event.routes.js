import express from "express";
import { fetchEvents, addEvent, editEvent, removeEvent } from "./event.controller.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Public routes
router.get("/", fetchEvents);

// Protected routes (Admin only)
router.post("/", protectAdmin, upload.single("imageFile"), addEvent);
router.put("/:id", protectAdmin, upload.single("imageFile"), editEvent);
router.delete("/:id", protectAdmin, removeEvent);

export default router;
