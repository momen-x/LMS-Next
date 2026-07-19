import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(6, "Name must be at least 6 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

export const RegisterDataAPI = z.object({
  username: z.string().min(6, "Name must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type RegisterDataAPI = z.infer<typeof RegisterDataAPI>;
