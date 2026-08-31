import express from "express";
import {
  login,
  logout,
  refresh,
  me,
  refreshAndRedirect,
  retrieveSecurityQuestion,
  resetPassword,
  sendOtp,
  verifyOtpReset,
} from "./auth.controller.js";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  sendOtpSchema,
  verifyOtpResetSchema,
} from "./auth.validators.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { protectAdmin } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", validateBody(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/refresh", refreshAndRedirect);
router.get("/me", protectAdmin, me);

// OTP-Based Password Reset Routes
router.post("/send-otp", validateBody(sendOtpSchema), sendOtp);
router.post("/verify-otp-reset", validateBody(verifyOtpResetSchema), verifyOtpReset);

// Legacy Security Question Route
router.post("/security-question", validateBody(forgotPasswordSchema), retrieveSecurityQuestion);
router.post("/reset-password", validateBody(resetPasswordSchema), resetPassword);

export default router;
