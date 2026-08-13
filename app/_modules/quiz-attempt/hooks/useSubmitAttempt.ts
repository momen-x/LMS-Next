import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QuizAttempt } from "../entities/quiz-attempt";
import { resQuizAttempt } from "../repo/resQuizAttempt";
import { QUIZ_ATTEMPT_KEYS } from "./quiz-attempt-keys";

export const useSubmitAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attemptId: string) => resQuizAttempt.submitAttempt(attemptId),

    onSuccess: (submittedAttempt) => {
      queryClient.setQueryData<QuizAttempt[]>(
        QUIZ_ATTEMPT_KEYS.myAttempts(submittedAttempt.quizId),
        (currentAttempts = []) =>
          currentAttempts.map((attempt) =>
            attempt.id === submittedAttempt.id ? submittedAttempt : attempt,
          ),
      );
    },
  });
};
