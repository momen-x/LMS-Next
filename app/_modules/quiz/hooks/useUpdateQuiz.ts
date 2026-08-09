import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateQuizData } from "../dto/update-quiz";
import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

interface UpdateQuizVariables {
  quizId: string;
  courseId: string;
  data: UpdateQuizData;
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, data }: UpdateQuizVariables) =>
      resQuiz.update(quizId, data),

    onSuccess: (updatedQuiz, variables) => {
      queryClient.setQueryData(QUIZ_KEYS.detail(variables.quizId), updatedQuiz);

      queryClient.invalidateQueries({
        queryKey: QUIZ_KEYS.course(variables.courseId),
      });
    },
  });
}
