import express from "express";
import { fetchStudents, addStudent, editStudent, removeStudent } from "./student.controller.js";
import { studentSchema } from "./student.validators.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";
import { validateBody } from "../../middleware/validate.middleware.js";

const router = express.Router();

router.use(protectAdmin); // Protect all student routes

router.get("/", fetchStudents);
router.post("/", validateBody(studentSchema), addStudent);
router.put("/:id", validateBody(studentSchema), editStudent);
router.delete("/:id", removeStudent);

export default router;
