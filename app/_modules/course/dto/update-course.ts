import { z } from "zod";
import { createCourseSchema } from "./create-course";

export const updateCourseSchema = createCourseSchema
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type UpdateCourseData = z.infer<typeof updateCourseSchema>;
