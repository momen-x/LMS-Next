import { z } from "zod";

import { createQuestionSchema } from "./create-question";

export const updateQuestionSchema = createQuestionSchema
  .partial()
  .refine((data) => data.text !== undefined, {
    message: "At least one field must be updated",
  });

export type UpdateQuestionData = z.infer<typeof updateQuestionSchema>;
