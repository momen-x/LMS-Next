"use client";

import { Award, CheckCircle2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { QuizAttempt } from "../entity/quiz-attempt";

type AttemptResultProps = {
  attempt: QuizAttempt;
  totalMark: number;
  canTryAgain: boolean;
  onBackToQuiz: () => void;
  onTryAgain: () => void;
};

export default function AttemptResult({
  attempt,
  totalMark,
  canTryAgain,
  onBackToQuiz,
  onTryAgain,
}: AttemptResultProps) {
  const score = attempt.score;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader className="items-center border-b text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Award className="size-8" />
          </div>

          <CardTitle className="mt-3 text-2xl">Attempt Completed</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          <div className="mx-auto max-w-md text-center">
            <p className="text-sm text-muted-foreground">Your score</p>

            <p className="mt-2 text-6xl font-bold text-primary">
              {score !== null ? `${score}%` : "—"}
            </p>

            <Progress value={score ?? 0} className="mt-5" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultItem
              icon={CheckCircle2}
              label="Correct answers"
              value={`${attempt.correctAnswers ?? "—"} / ${attempt.totalQuestions ?? "—"}`}
            />

            <ResultItem
              icon={Award}
              label="Mark"
              value={`${attempt.earnedMark ?? "—"} / ${totalMark}`}
            />

            <ResultItem
              icon={Award}
              label="Total questions"
              value={attempt.totalQuestions ?? "—"}
            />
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" variant="outline" onClick={onBackToQuiz}>
              Back to Quiz
            </Button>

            {canTryAgain && (
              <Button type="button" onClick={onTryAgain}>
                <RotateCcw className="size-4" />
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type ResultItemProps = {
  icon: React.ElementType;
  label: string;
  value: number | string;
};

function ResultItem({ icon: Icon, label, value }: ResultItemProps) {
  return (
    <div className="rounded-xl border p-4 text-center">
      <Icon className="mx-auto size-5 text-muted-foreground" />

      <p className="mt-2 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
