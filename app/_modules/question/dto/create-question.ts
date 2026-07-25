import { z } from "zod";

export const createQuestionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(5, "Question must be at least 5 characters")
    .max(1000, "Question cannot exceed 1000 characters"),
});

export type CreateQuestionData = z.infer<typeof createQuestionSchema>;
