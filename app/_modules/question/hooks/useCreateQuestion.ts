import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateQuestionData } from "../dto/create-question";
import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

interface CreateQuestionVariables {
  questionBankId: string;
  data: CreateQuestionData;
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionBankId, data }: CreateQuestionVariables) =>
      resQuestion.create(questionBankId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.questionBank(variables.questionBankId),
      });

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.list(),
      });
    },
  });
}
