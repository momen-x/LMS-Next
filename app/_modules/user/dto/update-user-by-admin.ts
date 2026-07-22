import z from "zod";
import { passwordSchema } from "../../auth/dto/register";

export const updateUserNameByAdmin = z.object({
  name: z.string().min(5).max(75),
});

export const updateUserPasswordByAdmin = z.object({
  email: z.email(),
  password: passwordSchema,
});
export type TUpdateUserNameByAdmin = z.infer<typeof updateUserNameByAdmin>;

export type TUpdateUserPasswordByAdmin = z.infer<
  typeof updateUserPasswordByAdmin
>;
