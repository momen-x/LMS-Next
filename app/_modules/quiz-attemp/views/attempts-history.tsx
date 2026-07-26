"use client";

import { History, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { QuizAttempt } from "../entity/quiz-attempt";
import AttemptHistoryCard from "./attempt-history-card";

type AttemptsHistoryProps = {
  attempts: QuizAttempt[];
  passingScore: number;
  isLoading: boolean;
  isError: boolean;
  onContinue: (attempt: QuizAttempt) => void;
};

export default function AttemptsHistory({
  attempts,
  passingScore,
  isLoading,
  isError,
  onContinue,
}: AttemptsHistoryProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-32 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load your quiz attempts.</AlertDescription>
      </Alert>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed text-center">
        <History className="mb-3 size-8 text-muted-foreground" />

        <h3 className="font-semibold">No attempts yet</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Start the quiz when you are ready.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attempts.map((attempt) => (
        <AttemptHistoryCard
          key={attempt.id}
          attempt={attempt}
          passingScore={passingScore}
          onContinue={onContinue}
        />
      ))}
    </div>
  );
}
