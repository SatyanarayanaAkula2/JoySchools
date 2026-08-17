import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  album: z.string().min(1, "Album is required").trim(),
  image: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
});
