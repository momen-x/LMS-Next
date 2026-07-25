import { z } from "zod";

import { createChoiceSchema } from "./create-choice";

export const updateChoiceSchema = createChoiceSchema
  .partial()
  .refine((data) => data.text !== undefined || data.isCorrect !== undefined, {
    message: "At least one field must be updated",
  });

export type UpdateChoiceData = z.infer<typeof updateChoiceSchema>;
