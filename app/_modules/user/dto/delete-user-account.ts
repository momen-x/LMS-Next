import z from "zod";

export const DeleteUserAccountSchema = z.object({
  delete: z
    .string()
    .min(1, 'Please type "DELETE" to confirm')
    .refine((value) => value === "DELETE", {
      message: 'Please type "DELETE" to confirm',
    }),
});

export type TDeleteUserAccountForm = {
  delete: string;
};

export type TDeleteUserAccount = z.output<
  typeof DeleteUserAccountSchema
>;