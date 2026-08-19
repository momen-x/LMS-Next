"use client";

import { useState } from "react";
import {
  Award,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Loader2,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-axios-error-message";

import { CourseLearning } from "@/app/_modules/course/entities/course-learning";
import { useStartAttempt } from "@/app/_modules/quiz-attempt/hooks/useStartAttempt";

import { StudentAttemptView } from "../../entities/start-quiz";
import { QuizAttempt } from "../../entities/quiz-attempt";
import QuizAttemptView from "./quiz-attempt-view";
import Link from "next/link";

type LearningQuiz = CourseLearning["quizzes"][number];

interface QuizLearningContentProps {
  quiz: LearningQuiz;
}

export default function QuizLearningContent({
  quiz,
}: QuizLearningContentProps) {
  const startAttempt = useStartAttempt();

  const [activeAttempt, setActiveAttempt] = useState<StudentAttemptView | null>(
    null,
  );

  const [submittedAttempt, setSubmittedAttempt] = useState<QuizAttempt | null>(
    null,
  );

  const attemptsUsed = quiz.attempts.length;

  const attemptsRemaining = Math.max(quiz.maxAttempts - attemptsUsed, 0);

  const existingActiveAttempt = quiz.attempts.find(
    (attempt) => attempt.status === "in_progress",
  );

  const hasActiveAttempt =
    Boolean(activeAttempt) || Boolean(existingActiveAttempt);

  const submittedAttempts = quiz.attempts.filter(
    (attempt) => attempt.status === "submitted",
  );

  const hasPerfectScore = submittedAttempts.some(
    (attempt) => attempt.score === 100,
  );

  const hasReachedMaxAttempts =
    attemptsUsed >= quiz.maxAttempts && !hasActiveAttempt;

  const bestScore =
    submittedAttempts.length > 0
      ? Math.max(...submittedAttempts.map((attempt) => attempt.score ?? 0))
      : null;

  const hasPassed = bestScore !== null && bestScore >= quiz.passingScore;

  const handleStartAttempt = async () => {
    if (startAttempt.isPending || hasPerfectScore || hasReachedMaxAttempts) {
      return;
    }

    try {
      const attempt = await startAttempt.mutateAsync(quiz.id);

      setSubmittedAttempt(null);
      setActiveAttempt(attempt);

      toast.success(
        existingActiveAttempt
          ? "Quiz attempt resumed"
          : "Attempt started successfully",
      );
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "Unable to start the quiz");
    }
  };

  const handleSubmitted = (attempt: QuizAttempt) => {
    setActiveAttempt(null);
    setSubmittedAttempt(attempt);
  };

  const handleTryAgain = async () => {
    setSubmittedAttempt(null);

    await handleStartAttempt();
  };

  if (activeAttempt) {
    return (
      <QuizAttemptView attempt={activeAttempt} onSubmitted={handleSubmitted} />
    );
  }

  if (submittedAttempt) {
    return (
      <QuizResultView
        quiz={quiz}
        attempt={submittedAttempt}
        attemptsRemaining={Math.max(quiz.maxAttempts - attemptsUsed, 0)}
        onTryAgain={handleTryAgain}
        isStarting={startAttempt.isPending}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="rounded-2xl border bg-card p-4 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileQuestion className="size-6" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-primary">Quiz</p>

            <h1 className="mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">
              {quiz.title}
            </h1>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuizDetail label="Questions" value={String(quiz.questionCount)} />

          <QuizDetail
            label="Duration"
            value={`${quiz.duration} min`}
            icon={<Clock3 className="size-4" />}
          />

          <QuizDetail label="Passing score" value={`${quiz.passingScore}%`} />

          <QuizDetail
            label="Attempts"
            value={`${attemptsUsed} / ${quiz.maxAttempts}`}
          />
        </div>

        {hasPerfectScore ? (
          <PerfectScoreState bestScore={bestScore ?? 100} />
        ) : hasActiveAttempt ? (
          <div className="mt-8">
            <div className="rounded-xl bg-muted/50 p-5">
              <p className="font-medium">You have an active attempt</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Continue your current quiz attempt.
              </p>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                disabled={startAttempt.isPending}
                onClick={handleStartAttempt}
                className="gap-2"
              >
                {startAttempt.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Loading attempt...
                  </>
                ) : (
                  "Continue Quiz"
                )}
              </Button>
            </div>
          </div>
        ) : hasReachedMaxAttempts ? (
          <div className="mt-8 rounded-xl border bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />

              <div>
                <p className="font-medium">No attempts remaining</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  You have reached the maximum number of attempts for this quiz.
                </p>

                {bestScore !== null && (
                  <p className="mt-3 text-sm font-medium">
                    Best score: {bestScore}%
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="rounded-xl bg-muted/50 p-5">
              <p className="font-medium">
                {attemptsUsed === 0
                  ? "Ready to start?"
                  : hasPassed
                    ? "Want to improve your score?"
                    : "Ready to try again?"}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                You have {attemptsRemaining}{" "}
                {attemptsRemaining === 1 ? "attempt" : "attempts"} remaining.
              </p>

              {bestScore !== null && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Best score: {bestScore}%
                </p>
              )}
            </div>

            <div className="mt-6">
              <Button
                type="button"
                disabled={startAttempt.isPending}
                onClick={handleStartAttempt}
                className="gap-2"
              >
                {startAttempt.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Starting...
                  </>
                ) : attemptsUsed > 0 ? (
                  <>
                    <RotateCcw className="size-4" />
                    Try Again
                  </>
                ) : (
                  "Start Quiz"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizResultView({
  quiz,
  attempt,
  attemptsRemaining,
  onTryAgain,
  isStarting,
}: {
  quiz: LearningQuiz;
  attempt: QuizAttempt;
  attemptsRemaining: number;
  onTryAgain: () => void;
  isStarting: boolean;
}) {
  const score = attempt.score ?? 0;

  const passed = score >= quiz.passingScore;

  const perfectScore = score === 100;

  const canTryAgain = !perfectScore && attemptsRemaining > 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="rounded-2xl border bg-card p-4 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            {perfectScore ? (
              <Trophy className="size-8" />
            ) : passed ? (
              <CheckCircle2 className="size-8" />
            ) : (
              <XCircle className="size-8 text-destructive" />
            )}
          </div>

          <p className="mt-5 text-sm font-medium text-muted-foreground">
            Quiz Result
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {perfectScore
              ? "Perfect Score!"
              : passed
                ? "Quiz Passed"
                : "Quiz Not Passed"}
          </h1>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {perfectScore
              ? "Excellent work. You achieved the highest possible score."
              : passed
                ? "You successfully passed this quiz."
                : attemptsRemaining > 0
                  ? "You can use another attempt to improve your result."
                  : "You have used all available attempts for this quiz."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuizDetail label="Score" value={`${score}%`} />

          <QuizDetail
            label="Earned mark"
            value={
              attempt.earnedMark !== null
                ? `${attempt.earnedMark} / ${quiz.totalMark}`
                : "-"
            }
          />

          <QuizDetail
            label="Correct answers"
            value={
              attempt.correctAnswers !== null && attempt.totalQuestions !== null
                ? `${attempt.correctAnswers} / ${attempt.totalQuestions}`
                : "-"
            }
          />

          <QuizDetail
            label="Attempt"
            value={`${attempt.attemptNumber} / ${quiz.maxAttempts}`}
          />
        </div>

        <div className="mt-8 rounded-xl border bg-muted/40 p-5">
          <div className="flex items-start gap-3">
            <Award className="mt-0.5 size-5 shrink-0 text-primary" />

            <div>
              <p className="font-medium">
                {perfectScore
                  ? "No more attempts needed"
                  : passed
                    ? "You passed this quiz"
                    : "Passing score not reached"}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Required score: {quiz.passingScore}%
              </p>

              {!perfectScore && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Attempts remaining: {attemptsRemaining}
                </p>
              )}
            </div>
          </div>
  
        </div>

        {canTryAgain && (
          <div className="mt-6">
            <Button
              type="button"
              disabled={isStarting}
              onClick={onTryAgain}
              className="gap-2"
            >
              {isStarting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <RotateCcw className="size-4" />
                  Try Again
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function PerfectScoreState({ bestScore }: { bestScore: number }) {
  return (
    <div className="mt-8 rounded-xl border bg-muted/40 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Trophy className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold">Perfect Score Achieved</p>

          <p className="mt-1 text-sm text-muted-foreground">
            You scored {bestScore}% on this quiz. No additional attempts are
            available or needed.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end sm:gap-3">
          <Link href="/student-dashboard/certificates" className="w-full sm:w-auto">
            <Button className="w-full">Certificates</Button>
          </Link>
          <Link href="/student-dashboard/courses" className="w-full sm:w-auto">
            <Button className="w-full">Learning</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuizDetail({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}

        <span>{label}</span>
      </div>

      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
