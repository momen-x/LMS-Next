import z from "zod";

export const resendVerificationSchema = z.object({
  email: z.string().trim().min(1).email("Invalid email address").toLowerCase(),
});

export type ResendVerificationData = z.infer<typeof resendVerificationSchema>;
