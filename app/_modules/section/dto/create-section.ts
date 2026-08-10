import z from "zod";

export const createSectionSchema = z.object({
  title: z.string().trim().min(5),
});

export type CreateSectionData = z.infer<typeof createSectionSchema>;
