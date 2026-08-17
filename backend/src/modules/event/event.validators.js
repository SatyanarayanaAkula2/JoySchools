import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Event title is required").trim(),
  description: z.string().trim().optional().or(z.literal("")),
  date: z.preprocess((val) => new Date(val), z.date({
    required_error: "A valid event date is required",
    invalid_type_error: "Invalid date format",
  })),
  category: z.enum(["Holiday", "Academic", "Co-curricular", "Sports", "Achievement", "Other"]).default("Academic"),
  image: z.string().trim().optional().or(z.literal("")),
});
