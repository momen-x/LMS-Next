import { z } from "zod";
import { createLessonSchema } from "./create-lesson";

export const updateLessonSchema = createLessonSchema
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type UpdateLessonData = z.infer<typeof updateLessonSchema>;
