import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 6 characters long"),
    email: z.string().trim().email("Invalid email address").toLowerCase(),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    isAgree: z.literal(true, {
      error: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

export const RegisterDataAPI = z.object({
  name: z.string().min(6, "Name must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type RegisterDataAPI = z.infer<typeof RegisterDataAPI>;
