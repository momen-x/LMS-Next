import z from "zod";

export const createLessonSchema = z.object({
  title: z.string().trim().min(5, "Lesson title must be at least 5 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .nullable()
    .optional(),

  isPreview: z.boolean().optional(),
});

export type CreateLessonData = z.infer<typeof createLessonSchema>;
