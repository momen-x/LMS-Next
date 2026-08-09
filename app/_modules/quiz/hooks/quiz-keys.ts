export const QUIZ_KEYS = {
  all: ["quizzes"] as const,

  detail: (quizId: string) => [...QUIZ_KEYS.all, "detail", quizId] as const,

  course: (courseId: string) => [...QUIZ_KEYS.all, "course", courseId] as const,
};
