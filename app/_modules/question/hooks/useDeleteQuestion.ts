import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

interface DeleteQuestionVariables {
  questionId: string;
  quizId: string;
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
        queryKey: QUESTION_KEYS.quiz(variables.quizId),
      });

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.list(),
      });
    },
  });
}
