import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateQuestionsBankData } from "../dto/questions-bank.dto";
import { resQuestionBank } from "../repo/resQuestionBank";
import { QUESTION_BANK_KEYS } from "./question-bank-keys";

interface UpdateQuestionsBankVariables {
  questionsBankId: string;
  courseId: string;
  data: UpdateQuestionsBankData;
}

export function useUpdateQuestionsBank() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionsBankId, data }: UpdateQuestionsBankVariables) =>
      resQuestionBank.update(questionsBankId, data),

    onSuccess: (updatedQuestionsBank, variables) => {
      queryClient.setQueryData(
        QUESTION_BANK_KEYS.detail(variables.questionsBankId),
        updatedQuestionsBank,
      );

      queryClient.invalidateQueries({
        queryKey: QUESTION_BANK_KEYS.course(variables.courseId),
      });
    },
  });
}
