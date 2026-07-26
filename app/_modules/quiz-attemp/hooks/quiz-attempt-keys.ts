export const QUIZ_ATTEMPT_KEYS = {
  all: ["quiz-attempts"] as const,

  lists: () => [...QUIZ_ATTEMPT_KEYS.all, "list"] as const,

  myAttempts: (quizId: string) =>
    [...QUIZ_ATTEMPT_KEYS.lists(), "my-attempts", quizId] as const,

  answers: (attemptId: string) =>
    [...QUIZ_ATTEMPT_KEYS.all, "answers", attemptId] as const,
};
