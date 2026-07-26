import { useQuery } from "@tanstack/react-query";

import { resQuizAttempt } from "../repo/resQuizAttempt";
import { QUIZ_ATTEMPT_KEYS } from "./quiz-attempt-keys";

export function useGetAttemptAnswers(attemptId: string, enabled = true) {
  return useQuery({
    queryKey: QUIZ_ATTEMPT_KEYS.answers(attemptId),

    queryFn: () => resQuizAttempt.getAttemptAnswers(attemptId),

    enabled: Boolean(attemptId) && enabled,
  });
}
