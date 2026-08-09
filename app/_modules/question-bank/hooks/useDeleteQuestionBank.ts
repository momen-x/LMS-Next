import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resQuestionBank } from "../repo/resQuestionBank";
import { QUESTION_BANK_KEYS } from "./question-bank-keys";

interface DeleteQuestionBankVariables {
  questionsBankId: string;
  courseId: string;
}

export function useDeleteQuestionBank() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionsBankId }: DeleteQuestionBankVariables) => resQuestionBank.delete(questionsBankId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_BANK_KEYS.course(variables.courseId),
      });

      queryClient.removeQueries({
        queryKey: QUESTION_BANK_KEYS.detail(variables.questionsBankId),
      });
    },
  });
}
