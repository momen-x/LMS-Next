import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateQuestionData } from "../dto/update-question";
import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

interface UpdateQuestionVariables {
  questionId: string;
  quizId: string;
  data: UpdateQuestionData;
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, data }: UpdateQuestionVariables) =>
      resQuestion.update(questionId, data),

    onSuccess: (updatedQuestion, variables) => {
      queryClient.setQueryData(
        QUESTION_KEYS.detail(variables.questionId),
        updatedQuestion,
      );

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.quiz(variables.quizId),
      });

      queryClient.invalidateQueries({
        queryKey: QUESTION_KEYS.list(),
      });
    },
  });
}
