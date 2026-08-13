import { useQuery } from "@tanstack/react-query";

import { resQuizAttempt } from "../repo/resQuizAttempt";
import { QUIZ_ATTEMPT_KEYS } from "./quiz-attempt-keys";

export const useGetMyAttempts = (quizId: string) => {
  return useQuery({
    queryKey: QUIZ_ATTEMPT_KEYS.myAttempts(quizId),

    queryFn: () => resQuizAttempt.getMyAttempts(quizId),

    enabled: Boolean(quizId),
  });
};
