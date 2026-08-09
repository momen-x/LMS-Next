export const QUESTION_BANK_KEYS = {
  all: ["question-banks"] as const,

  detail: (questionsBankId: string) =>
    [...QUESTION_BANK_KEYS.all, "detail", questionsBankId] as const,

  course: (courseId: string) =>
    [...QUESTION_BANK_KEYS.all, "course", courseId] as const,
};
