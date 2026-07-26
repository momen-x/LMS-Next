"use client";

import { Award, CheckCircle2, CircleX, RotateCcw, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { QuizAttempt } from "../entity/quiz-attempt";

type AttemptResultProps = {
  attempt: QuizAttempt;
  passingScore: number;
  canTryAgain: boolean;
  onBackToQuiz: () => void;
  onTryAgain: () => void;
};

export default function AttemptResult({
  attempt,
  passingScore,
  canTryAgain,
  onBackToQuiz,
  onTryAgain,
}: AttemptResultProps) {
  const score = attempt.score ?? 0;
  const correctAnswers = attempt.correctAnswers ?? 0;
  const totalQuestions = attempt.totalQuestions ?? 0;
  const incorrectAnswers = Math.max(totalQuestions - correctAnswers, 0);

  const hasPassed = score >= passingScore;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader className="items-center border-b text-center">
          <div
            className={
              hasPassed
                ? "flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700"
                : "flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive"
            }
          >
            {hasPassed ? (
              <Trophy className="size-8" />
            ) : (
              <Award className="size-8" />
            )}
          </div>

          <CardTitle className="mt-3 text-2xl">
            {hasPassed ? "Great Job!" : "Attempt Completed"}
          </CardTitle>

          <Badge
            variant={hasPassed ? "default" : "destructive"}
            className={
              hasPassed ? "bg-green-600 hover:bg-green-600" : undefined
            }
          >
            {hasPassed ? "Passed" : "Not Passed"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          <div className="mx-auto max-w-md text-center">
            <p className="text-sm text-muted-foreground">Your score</p>

            <p
              className={
                hasPassed
                  ? "mt-2 text-6xl font-bold text-green-600"
                  : "mt-2 text-6xl font-bold text-destructive"
              }
            >
              {Math.round(score)}%
            </p>

            <Progress value={score} className="mt-5" />

            <p className="mt-3 text-sm text-muted-foreground">
              Passing score: {passingScore}%
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultItem
              icon={CheckCircle2}
              label="Correct answers"
              value={correctAnswers}
            />

            <ResultItem
              icon={CircleX}
              label="Incorrect answers"
              value={incorrectAnswers}
            />

            <ResultItem
              icon={Award}
              label="Total questions"
              value={totalQuestions}
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
  value: number;
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
