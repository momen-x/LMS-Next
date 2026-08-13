import { useMutation } from "@tanstack/react-query";

import { TSaveAttemptAnswer } from "../dto/save-attempt-answer";
import { resQuizAttempt } from "../repo/resQuizAttempt";

type SaveAttemptAnswerVariables = {
  attemptId: string;
  questionId: string;
  data: TSaveAttemptAnswer;
};

export const useSaveAttemptAnswer = () => {
  return useMutation({
    mutationFn: ({ attemptId, questionId, data }: SaveAttemptAnswerVariables) =>
      resQuizAttempt.saveAnswer(attemptId, questionId, data),
  });
};
