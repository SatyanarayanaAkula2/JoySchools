import express from "express";
import { fetchMilestones, addMilestone, editMilestone, removeMilestone } from "./milestone.controller.js";
import { milestoneSchema } from "./milestone.validators.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";

const router = express.Router();

// Public routes
router.get("/", fetchMilestones);

// Protected routes (Admin only)
router.post("/", protectAdmin, validateBody(milestoneSchema), addMilestone);
router.put("/:id", protectAdmin, validateBody(milestoneSchema), editMilestone);
router.delete("/:id", protectAdmin, removeMilestone);

export default router;
