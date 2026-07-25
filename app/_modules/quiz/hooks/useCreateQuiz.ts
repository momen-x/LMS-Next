import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateQuizData } from "../dto/create-quiz";
import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

interface CreateQuizVariables {
  lessonId: string;
  data: CreateQuizData;
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lessonId, data }: CreateQuizVariables) =>
      resQuiz.create(lessonId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUIZ_KEYS.lesson(variables.lessonId),
      });
    },
  });
}
