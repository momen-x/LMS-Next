import { z } from "zod";

export const createQuizSchema = z.object({
  title: z.string().trim().min(5, "Quiz title must be at least 5 characters"),

  passingScore: z.coerce
    .number()
    .min(0, "Passing score cannot be less than 0")
    .max(100, "Passing score cannot be greater than 100")
    .optional(),

  maxAttempts: z.coerce
    .number()
    .int("Maximum attempts must be an integer")
    .min(1, "Maximum attempts must be at least 1")
    .optional(),
});

export type CreateQuizData = z.infer<typeof createQuizSchema>;
