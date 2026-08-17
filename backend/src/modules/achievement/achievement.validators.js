import { z } from "zod";

export const achievementSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  category: z.string().min(1, "Category is required").trim(),
  year: z.string().min(1, "Year is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  image: z.string().trim().optional().or(z.literal("")),
});
