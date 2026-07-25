import { useQuery } from "@tanstack/react-query";

import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

export function useGetQuizQuestions(quizId: string) {
  return useQuery({
    queryKey: QUESTION_KEYS.quiz(quizId),
    queryFn: () => resQuestion.getQuizQuestions(quizId),
    enabled: Boolean(quizId),
  });
}
