import { z } from "zod";

import { createQuizSchema } from "./create-quiz";

export const updateQuizSchema = createQuizSchema
  .partial()
  .refine(
    (data) =>
      data.title !== undefined ||
      data.passingScore !== undefined ||
      data.maxAttempts !== undefined,
    {
      message: "At least one field must be updated",
    },
  );

export type UpdateQuizData = z.infer<typeof updateQuizSchema>;
