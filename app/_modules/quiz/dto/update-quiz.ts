import { z } from "zod";

import { createQuizSchema } from "./create-quiz";

export const updateQuizSchema = createQuizSchema
  .partial()
  .refine(
    (data) =>
      data.title !== undefined ||
      data.questionBankId !== undefined ||
      data.questionCount !== undefined ||
      data.totalMark !== undefined ||
      data.passingScore !== undefined ||
      data.maxAttempts !== undefined ||
      data.duration !== undefined,
    {
      message: "At least one field must be updated",
    },
  );

export type UpdateQuizData = z.infer<typeof updateQuizSchema>;
