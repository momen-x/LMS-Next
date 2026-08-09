import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateQuizData } from "../dto/create-quiz";
import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

interface CreateQuizVariables {
  courseId: string;
  data: CreateQuizData;
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, data }: CreateQuizVariables) =>
      resQuiz.create(courseId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUIZ_KEYS.course(variables.courseId),
      });
    },
  });
}
