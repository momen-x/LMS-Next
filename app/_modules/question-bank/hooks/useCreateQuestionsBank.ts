import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateQuestionsBankData } from "../dto/questions-bank.dto";
import { resQuestionBank } from "../repo/resQuestionBank";
import { QUESTION_BANK_KEYS } from "./question-bank-keys";

interface CreateQuestionsBankVariables {
  courseId: string;
  data: CreateQuestionsBankData;
}

export function useCreateQuestionsBank() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, data }: CreateQuestionsBankVariables) =>
      resQuestionBank.create(courseId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_BANK_KEYS.course(variables.courseId),
      });
    },
  });
}


