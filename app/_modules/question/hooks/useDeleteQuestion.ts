import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

interface DeleteQuestionVariables {
  questionId: string;
  questionBankId: string;
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId }: DeleteQuestionVariables) =>
      resQuestion.delete(questionId),

    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: QUESTION_KEYS.detail(variables.questionId),
      });

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.questionBank(variables.questionBankId),
      });

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.list(),
      });
    },
  });
}
