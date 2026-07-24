import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(4),
  slug: z.string().trim().min(4),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
