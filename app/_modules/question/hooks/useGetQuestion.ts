import { useQuery } from "@tanstack/react-query";

import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

export function useGetQuestion(questionId: string) {
  return useQuery({
    queryKey: QUESTION_KEYS.detail(questionId),
    queryFn: () => resQuestion.getById(questionId),
    enabled: Boolean(questionId),
  });
}
