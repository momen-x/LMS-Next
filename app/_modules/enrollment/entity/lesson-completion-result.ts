import { Enrollment } from "./enrollment";

export type LessonCompletionResult = {
  enrollment: Enrollment;
  lessonProgress: {
    id: string;
    enrollmentId: string;
    lessonId: string;
    completed: boolean;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
};