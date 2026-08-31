import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
});

export const sendOtpSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
});

export const verifyOtpResetSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  otp: z.string().min(6, "6-digit OTP is required").max(6, "OTP must be 6 digits").trim(),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export const resetPasswordSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  answer: z.string().optional(),
  otp: z.string().optional(),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});
