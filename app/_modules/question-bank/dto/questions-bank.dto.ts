import z from "zod";

export const createQuestionsBankSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Question bank title must be at least 5 characters"),
});

export const updateQuestionsBankSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Question bank title must be at least 5 characters"),
});
export const updateCourseIdQuestionsBankSchema = z.object({
  courseId: z.string().trim().min(1, "Course id is required"),
});

export type CreateQuestionsBankData = z.infer<typeof createQuestionsBankSchema>;
export type UpdateQuestionsBankData = z.infer<typeof updateQuestionsBankSchema>;
export type UpdateCourseIdQuestionsBankData = z.infer<
  typeof updateCourseIdQuestionsBankSchema
>;
