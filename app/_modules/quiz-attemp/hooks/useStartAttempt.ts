import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QuizAttempt } from "../entity/quiz-attempt";
import { resQuizAttempt } from "../repo/resQuizAttempt";
import { QUIZ_ATTEMPT_KEYS } from "./quiz-attempt-keys";

export const useStartAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizId: string) => resQuizAttempt.startAttempt(quizId),

    onSuccess: (attempt) => {
      queryClient.setQueryData<QuizAttempt[]>(
        QUIZ_ATTEMPT_KEYS.myAttempts(attempt.quizId),
        (currentAttempts = []) => {
          const attemptExists = currentAttempts.some(
            (currentAttempt) => currentAttempt.id === attempt.id,
          );

          if (attemptExists) {
            return currentAttempts.map((currentAttempt) =>
              currentAttempt.id === attempt.id ? attempt : currentAttempt,
            );
          }

          return [attempt, ...currentAttempts];
        },
      );
    },
  });
};
