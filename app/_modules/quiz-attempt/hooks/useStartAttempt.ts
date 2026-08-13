import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resQuizAttempt } from "../repo/resQuizAttempt";
import { QUIZ_ATTEMPT_KEYS } from "./quiz-attempt-keys";
import { StudentAttemptView } from "../entities/start-quiz";

export const useStartAttempt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizId: string) => resQuizAttempt.startAttempt(quizId),

    onSuccess: (attempt: StudentAttemptView) => {
      queryClient.setQueryData<StudentAttemptView[]>(
        QUIZ_ATTEMPT_KEYS.myAttempts(attempt.quizId),
        (currentAttempts = []) => {
          const attemptExists = currentAttempts.some(
            (currentAttempt) => currentAttempt.attemptId === attempt.attemptId,
          );

          if (attemptExists) {
            return currentAttempts.map((currentAttempt) =>
              currentAttempt.attemptId === attempt.attemptId
                ? attempt
                : currentAttempt,
            );
          }

          return [attempt, ...currentAttempts];
        },
      );
    },
  });
};
