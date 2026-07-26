import { z } from "zod";

export const createEnrollmentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
