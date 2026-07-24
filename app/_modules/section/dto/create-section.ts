import z from "zod";

export const createSectionSchema = z.object({
  title: z.string().trim().min(5),
  order: z.coerce
    .number()
    .int("Order must be an integer")
    .min(0, "Order cannot be negative"),
});

export type CreateSectionData = z.infer<typeof createSectionSchema>;
