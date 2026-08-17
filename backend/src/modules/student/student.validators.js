import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(1, "Student name is required").trim(),
  className: z.string().min(1, "Class/grade is required").trim(),
  rollNumber: z.string().trim().optional().or(z.literal("")),
  guardianName: z.string().trim().optional().or(z.literal("")),
  guardianPhone: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});
