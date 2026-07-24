import z from "zod";

export const createCourseSchema = z.object({
  categoryId: z.string().min(5),
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.coerce.number().min(0.0, "Price must be at least $0.00"),
  level: z.enum(["beginner", "intermediate", "advanced"]),

  language: z.string().min(2),
  thumbnail: z.instanceof(File).optional(),
});

export type CreateCourseData = z.infer<typeof createCourseSchema>;
