import express from "express";
import { login, logout, refresh, me, refreshAndRedirect } from "./auth.controller.js";
import { loginSchema } from "./auth.validators.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", validateBody(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/refresh", refreshAndRedirect);
router.get("/me", protectAdmin, me);

export default router;

