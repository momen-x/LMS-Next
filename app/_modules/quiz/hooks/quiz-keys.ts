export const QUIZ_KEYS = {
  all: ["quizzes"] as const,

  detail: (quizId: string) => [...QUIZ_KEYS.all, "detail", quizId] as const,

  lesson: (lessonId: string) => [...QUIZ_KEYS.all, "lesson", lessonId] as const,
};
