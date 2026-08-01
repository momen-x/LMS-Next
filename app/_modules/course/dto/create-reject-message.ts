import { z } from "zod";

export const createRejectMessageSchema = z.object({
  text: z
    .string()
    .trim()
    .min(5, "Rejection message must contain at least 5 characters")
    .max(500, "Rejection message cannot exceed 500 characters"),
});

export type CreateRejectMessageData = z.infer<typeof createRejectMessageSchema>;
