import { z } from "zod";

export const milestoneSchema = z.object({
  icon: z.string().min(1, "Icon/Emoji is required").trim(),
  value: z.string().min(1, "Value (e.g. 15+) is required").trim(),
  label: z.string().min(1, "Label is required").trim(),
  order: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number().default(0)),
});
