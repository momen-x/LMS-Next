import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

interface DeleteQuizVariables {
  quizId: string;
  lessonId: string;
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId }: DeleteQuizVariables) => resQuiz.delete(quizId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUIZ_KEYS.lesson(variables.lessonId),
      });

      queryClient.removeQueries({
        queryKey: QUIZ_KEYS.detail(variables.quizId),
      });
    },
  });
}
