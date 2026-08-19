import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
});

export const resetPasswordSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  answer: z.string().min(1, "Security answer is required").trim(),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});
