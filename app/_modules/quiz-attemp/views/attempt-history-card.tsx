"use client";

import { CalendarClock, Clock3, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { QuizAttempt } from "../entity/quiz-attempt";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

type AttemptHistoryCardProps = {
  attempt: QuizAttempt;
  totalMark: number;
  onContinue: (attempt: QuizAttempt) => void;
};

export default function AttemptHistoryCard({
  attempt,
  totalMark,
  onContinue,
}: AttemptHistoryCardProps) {
  const isInProgress = attempt.status === "in_progress";

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted font-semibold">
            {attempt.attemptNumber}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">Attempt {attempt.attemptNumber}</h3>

              {isInProgress ? (
                <Badge variant="secondary">In Progress</Badge>
              ) : (
                <Badge>Submitted</Badge>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarClock className="size-4" />
                Started:{" "}
                {attempt.startedAt
                  ? transformingTheDateToATextString(attempt.startedAt)
                  : ""}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 className="size-4" />
                Submitted:{" "}
                {attempt.submittedAt
                  ? transformingTheDateToATextString(attempt.submittedAt)
                  : "Not submitted"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {!isInProgress && (
            <>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Score</p>
                <p className="font-semibold">
                  {attempt.score !== null
                    ? `${attempt.score}%`
                    : "—"}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Correct answers</p>
                <p className="font-semibold">
                  {attempt.correctAnswers ?? "—"}
                  {attempt.totalQuestions !== null
                    ? ` / ${attempt.totalQuestions}`
                    : ""}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Mark</p>
                <p className="font-semibold">
                  {attempt.earnedMark ?? "—"} / {totalMark}
                </p>
              </div>
            </>
          )}

          {isInProgress && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onContinue(attempt)}
            >
              <Play className="size-4" />
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
