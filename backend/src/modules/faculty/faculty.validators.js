import { z } from "zod";

export const facultySchema = z.object({
  name: z.string().min(1, "Faculty name is required").trim(),
  role: z.string().min(1, "Role/Designation is required").trim(),
  qualification: z.string().min(1, "Qualification is required").trim(),
  experience: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  image: z.string().trim().optional().or(z.literal("")),
  order: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number().default(0)),
});
