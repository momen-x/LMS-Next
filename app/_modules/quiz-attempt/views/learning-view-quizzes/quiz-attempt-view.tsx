/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useSaveAttemptAnswer } from "@/app/_modules/quiz-attempt/hooks/useSaveAttemptAnswer";
import { useSubmitAttempt } from "@/app/_modules/quiz-attempt/hooks/useSubmitAttempt";
import { StudentAttemptView } from "../../entities/start-quiz";
import { QuizAttempt } from "../../entities/quiz-attempt";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/get-axios-error-message";
import QuizQuestionNavigator from "./quiz-question-navigator";

interface QuizAttemptViewProps {
  attempt: StudentAttemptView;
  onSubmitted: (attempt: QuizAttempt) => void;
}

export default function QuizAttemptView({
  attempt,
  onSubmitted,
}: QuizAttemptViewProps) {
  const saveAnswer = useSaveAttemptAnswer();
  const submitAttempt = useSubmitAttempt();

  const autoSubmitTriggered = useRef(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | null>
  >(() =>
    Object.fromEntries(
      attempt.questions.map((question) => [
        question.id,
        question.selectedChoiceId,
      ]),
    ),
  );

  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getRemainingSeconds(attempt.expiresAt),
  );

  const currentQuestion = attempt.questions[currentQuestionIndex] ?? null;

  const isFirstQuestion = currentQuestionIndex === 0;

  const isLastQuestion = currentQuestionIndex === attempt.questions.length - 1;

  const answeredQuestionsCount = useMemo(() => {
    return attempt.questions.filter((question) =>
      Boolean(selectedAnswers[question.id]),
    ).length;
  }, [attempt.questions, selectedAnswers]);

  const handleSubmit = async () => {
    if (submitAttempt.isPending) {
      return;
    }

    try {
      const submittedAttempt = await submitAttempt.mutateAsync(
        attempt.attemptId,
      );

      onSubmitted(submittedAttempt);
      toast.success("Quiz submitted successfully");
    } catch (error) {
      console.error("SUBMIT QUIZ ERROR", error);

      toast.error(getErrorMessage(error) ?? "Unable to submit quiz");
    }
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemainingSeconds(getRemainingSeconds(attempt.expiresAt));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [attempt.expiresAt]);

  useEffect(() => {
    if (remainingSeconds > 0 || autoSubmitTriggered.current) {
      return;
    }

    autoSubmitTriggered.current = true;

    void handleSubmit();
  }, [remainingSeconds]);

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No questions are available for this attempt.
        </p>
      </div>
    );
  }

  const selectedChoiceId = selectedAnswers[currentQuestion.id] ?? null;

  const handleSelectChoice = async (choiceId: string) => {
    if (saveAnswer.isPending) {
      return;
    }

    const previousChoiceId = selectedChoiceId;

    setSelectedAnswers((current) => ({
      ...current,
      [currentQuestion.id]: choiceId,
    }));

    try {
      await saveAnswer.mutateAsync({
        attemptId: attempt.attemptId,
        questionId: currentQuestion.id,
        data: {
          choiceId,
        },
      });
    } catch {
      setSelectedAnswers((current) => ({
        ...current,
        [currentQuestion.id]: previousChoiceId,
      }));
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Attempt {attempt.attemptNumber}
          </p>

          <h1 className="mt-1 text-2xl font-bold">Quiz Attempt</h1>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium",
            remainingSeconds <= 60 && "border-destructive text-destructive",
          )}
        >
          <Clock3 className="size-4" />

          <span>{formatTimer(remainingSeconds)}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="mb-6">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of{" "}
                {attempt.questions.length}
              </span>

              <span className="text-muted-foreground">
                {answeredQuestionsCount} answered
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / attempt.questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Question {currentQuestion.order}
            </p>

            <h2 className="mt-3 text-xl font-semibold leading-8">
              {currentQuestion.text}
            </h2>

            <div className="mt-7 space-y-3">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={saveAnswer.isPending}
                    onClick={() => handleSelectChoice(choice.id)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border",
                        isSelected &&
                          "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      {isSelected && <CheckCircle2 className="size-3.5" />}
                    </span>

                    <span className="text-sm leading-6">{choice.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isFirstQuestion}
              onClick={() => setCurrentQuestionIndex((current) => current - 1)}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Previous Question
            </Button>

            {isLastQuestion ? (
              <Button
                type="button"
                disabled={submitAttempt.isPending || saveAnswer.isPending}
                onClick={handleSubmit}
                className="gap-2"
              >
                {submitAttempt.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Quiz"
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() =>
                  setCurrentQuestionIndex((current) => current + 1)
                }
                className="gap-2"
              >
                Next Question
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <QuizQuestionNavigator
            questions={attempt.questions}
            selectedAnswers={selectedAnswers}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={setCurrentQuestionIndex}
          />
        </div>
      </div>
    </div>
  );
}

function getRemainingSeconds(expiresAt: string | Date) {
  const expiresAtTime = new Date(expiresAt).getTime();
  const now = Date.now();

  return Math.max(Math.ceil((expiresAtTime - now) / 1000), 0);
}

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}
