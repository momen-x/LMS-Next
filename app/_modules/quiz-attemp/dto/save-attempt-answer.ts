import { z } from "zod";

export const saveAttemptAnswerSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  choiceId: z.string().min(1, "Choice ID is required"),
});

export type TSaveAttemptAnswer = z.infer<typeof saveAttemptAnswerSchema>;
