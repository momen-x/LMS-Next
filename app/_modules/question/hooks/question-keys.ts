export const QUESTION_KEYS = {
  all: ["questions"] as const,

  list: () => [...QUESTION_KEYS.all, "list"] as const,

  quiz: (quizId: string) => [...QUESTION_KEYS.all, "quiz", quizId] as const,

  detail: (questionId: string) =>
    [...QUESTION_KEYS.all, "detail", questionId] as const,
};
