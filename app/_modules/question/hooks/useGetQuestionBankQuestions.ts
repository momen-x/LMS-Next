import { useQuery } from "@tanstack/react-query";

import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

export function useGetQuestionBankQuestions(questionBankId: string) {
  return useQuery({
    queryKey: QUESTION_KEYS.questionBank(questionBankId),
    queryFn: () => resQuestion.getQuestionBankQuestions(questionBankId),
    enabled: Boolean(questionBankId),
  });
}
