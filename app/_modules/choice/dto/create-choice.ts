import { z } from "zod";

export const createChoiceSchema = z.object({
  text: z.string().trim().min(5, {
    message: "Choice must contain at least 5 characters",
  }),

  isCorrect: z.boolean().default(false),
});

export type CreateChoiceData = z.infer<typeof createChoiceSchema>;
