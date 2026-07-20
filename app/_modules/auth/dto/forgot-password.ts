import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1).email("Invalid email address").toLowerCase(),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
