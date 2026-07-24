import z from "zod";

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(4).optional(),
    slug: z.string().trim().min(4).optional(),
  })
  .refine((data) => data.name !== undefined || data.slug !== undefined, {
    message: "At least one field must be updated",
  });
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
