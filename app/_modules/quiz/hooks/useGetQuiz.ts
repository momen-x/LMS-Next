import { useQuery } from "@tanstack/react-query";

import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

export function useGetQuiz(quizId: string) {
  return useQuery({
    queryKey: QUIZ_KEYS.detail(quizId),
    queryFn: () => resQuiz.getById(quizId),
    enabled: Boolean(quizId),
  });
}
