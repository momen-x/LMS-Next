"use client";

import { Loader2, Play, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-axios-error-message";

import { QuizAttempt } from "../entity/quiz-attempt";
import { useStartAttempt } from "../hooks/useStartAttempt";

type StartQuizButtonProps = {
  quizId: string;
  activeAttempt?: QuizAttempt;
  attemptsCount: number;
  maxAttempts: number;
  onAttemptReady: (attempt: QuizAttempt) => void;
};

export default function StartQuizButton({
  quizId,
  activeAttempt,
  attemptsCount,
  maxAttempts,
  onAttemptReady,
}: StartQuizButtonProps) {
  const { mutateAsync: startAttempt, isPending } = useStartAttempt();

  const hasReachedMaximumAttempts =
    !activeAttempt && attemptsCount >= maxAttempts;

  const handleStartAttempt = async () => {
    try {
      const attempt = await startAttempt(quizId);

      onAttemptReady(attempt);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Button
      type="button"
      onClick={handleStartAttempt}
      disabled={isPending || hasReachedMaximumAttempts}
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Loading...
        </>
      ) : activeAttempt ? (
        <>
          <RotateCcw className="size-4" />
          Continue Attempt
        </>
      ) : (
        <>
          <Play className="size-4" />
          Start Quiz
        </>
      )}
    </Button>
  );
}
