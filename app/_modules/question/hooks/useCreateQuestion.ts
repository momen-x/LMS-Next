import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateQuestionData } from "../dto/create-question";
import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

interface CreateQuestionVariables {
  quizId: string;
  data: CreateQuestionData;
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, data }: CreateQuestionVariables) =>
      resQuestion.create(quizId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.quiz(variables.quizId),
      });

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.list(),
      });
    },
  });
}
