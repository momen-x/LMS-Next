import { z } from "zod";

export const updateReviewSchema = z
  .object({
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5")
      .optional(),
    comment: z
      .string()
      .max(2000, "Comment must not exceed 2000 characters")
      .optional(),
  })
  .refine((data) => data.rating !== undefined || data.comment !== undefined, {
    message: "At least one field must be provided",
  });

export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;
