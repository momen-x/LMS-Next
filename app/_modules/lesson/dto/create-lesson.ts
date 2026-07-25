import z from "zod";

export const lessonResourceSchema = z.object({
  title: z.string().trim().min(1, "Resource title is required"),
  url: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      { message: "URL must start with http:// or https://" },
    ),
});

export const createLessonSchema = z.object({
  title: z.string().trim().min(5, "Lesson title must be at least 5 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .nullable()
    .optional(),

  duration: z.coerce
    .number()
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 second"),

  isPreview: z.boolean().optional(),

  resources: z.array(lessonResourceSchema).nullable().optional(),
});

export type CreateLessonData = z.infer<typeof createLessonSchema>;
export type LessonResourceData = z.infer<typeof lessonResourceSchema>;
