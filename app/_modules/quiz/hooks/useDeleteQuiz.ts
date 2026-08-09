import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

interface DeleteQuizVariables {
  quizId: string;
  courseId: string;
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId }: DeleteQuizVariables) => resQuiz.delete(quizId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUIZ_KEYS.course(variables.courseId),
      });

      queryClient.removeQueries({
        queryKey: QUIZ_KEYS.detail(variables.quizId),
      });
    },
  });
}
