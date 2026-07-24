import z from "zod";

export const DeleteSchema = z.object({
  delete: z
    .string()
    .min(1, 'Please type "DELETE" to confirm')
    .refine((value) => value === "DELETE", {
      message: 'Please type "DELETE" to confirm',
    }),
});

export type TDeleteForm = {
  delete: string;
};

export type TDelete = z.output<typeof DeleteSchema>;
