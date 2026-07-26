"use client";

import { Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { Quiz } from "@/app/_modules/quiz/entity/quiz";

import { QuizAttempt } from "../entity/quiz-attempt";
import { useGetAttemptAnswers } from "../hooks/useGetAttemptAnswers";
import mapAttemptAnswers from "../utils/map-attempt-answers";

import QuizPlayer, { AttemptQuestion } from "./quiz-player";

type ActiveQuizAttemptProps = {
  attempt: QuizAttempt;
  quiz: Quiz;
  questions: AttemptQuestion[];
  attemptsCount: number;
  onBackToQuiz: () => void;
  onTryAgain: () => void;
};

export default function ActiveQuizAttempt({
  attempt,
  quiz,
  questions,
  attemptsCount,
  onBackToQuiz,
  onTryAgain,
}: ActiveQuizAttemptProps) {
  const {
    data: savedAnswers = [],
    isLoading,
    isError,
  } = useGetAttemptAnswers(attempt.id, attempt.status === "in_progress");

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <Loader2 className="size-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load your saved quiz answers.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <QuizPlayer
      key={attempt.id}
      attempt={attempt}
      quizTitle={quiz.title}
      passingScore={quiz.passingScore}
      maxAttempts={quiz.maxAttempts}
      attemptsCount={attemptsCount}
      questions={questions}
      initialAnswers={mapAttemptAnswers(savedAnswers)}
      onBackToQuiz={onBackToQuiz}
      onTryAgain={onTryAgain}
    />
  );
}
