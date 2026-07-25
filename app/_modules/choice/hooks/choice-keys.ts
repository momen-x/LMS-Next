export const CHOICE_KEYS = {
  all: ["choices"] as const,

  list: () => [...CHOICE_KEYS.all, "list"] as const,

  question: (questionId: string) =>
    [...CHOICE_KEYS.all, "question", questionId] as const,

  detail: (choiceId: string) =>
    [...CHOICE_KEYS.all, "detail", choiceId] as const,
};
