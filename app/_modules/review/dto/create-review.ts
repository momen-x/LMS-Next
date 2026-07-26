import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  comment: z
    .string()
    .max(2000, "Comment must not exceed 2000 characters")
    .optional(),
});

export type CreateReviewDto = z.infer<typeof createReviewSchema>;
