import z from "zod";
import { passwordSchema } from "../../auth/dto/register";

export const UploadUserAvatarSchema = z.object({
  avatar: z
    .instanceof(File, { message: "Enter a valid image file" })
    .optional()
    .nullable(),
});
export const UpdateUsernameSchema = z.object({
  name: z.string().min(5).max(75),
});
export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(1),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UpdatePasswordAPISchema = z.object({
  password: z.string().min(8),
  newPassword: passwordSchema,
});

export type TUploadUserAvatar = z.infer<typeof UploadUserAvatarSchema>;
export type TUpdateUsername = z.infer<typeof UpdateUsernameSchema>;
export type TUpdatePassword = z.infer<typeof UpdatePasswordSchema>;
export type TUpdatePasswordAPI = z.infer<typeof UpdatePasswordAPISchema>;
