import { z } from "zod";

export const createQuizSchema = z.object({
  title: z.string().trim().min(5, "Quiz title must be at least 5 characters"),

  passingScore: z.coerce
    .number()
    .min(0, "Passing score cannot be less than 0")
    .max(100, "Passing score cannot be greater than 100"),
  maxAttempts: z.coerce
    .number()
    .int("Maximum attempts must be an integer")
    .min(1, "Maximum attempts must be at least 1"),
  questionCount: z.coerce
    .number()
    .int("Question count must be an integer")
    .min(1, "Question count must be at least 1"),
  totalMark: z.coerce
    .number()
    .positive("Total mark must be greater than 0"),
  duration: z.coerce
    .number()
    .int("Duration in minutes must be an integer")
    .min(1, "Quiz Duration must be at lest 1 minutes"),
  questionBankId: z.string().trim().min(1, "Question bank id is required"),
});

export type CreateQuizData = z.infer<typeof createQuizSchema>;
