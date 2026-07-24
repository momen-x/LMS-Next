import { z } from "zod";
import { createSectionSchema } from "./create-section";

export const updateSectionSchema = createSectionSchema
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type UpdateSectionData = z.infer<typeof updateSectionSchema>;
