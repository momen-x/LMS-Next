export const QUESTION_KEYS = {
  all: ["questions"] as const,

  list: () => [...QUESTION_KEYS.all, "list"] as const,

  questionBank: (questionBankId: string) =>
    [...QUESTION_KEYS.all, "question-bank", questionBankId] as const,

  detail: (questionId: string) =>
    [...QUESTION_KEYS.all, "detail", questionId] as const,
};
