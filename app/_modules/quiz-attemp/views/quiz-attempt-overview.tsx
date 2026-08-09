"use client";

import { Award, CircleHelp, ListChecks, RotateCcw } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Quiz } from "@/app/_modules/quiz/entity/quiz";

import { QuizAttempt } from "../entity/quiz-attempt";
import { useGetMyAttempts } from "../hooks/useGetMyAttempts";
import AttemptsHistory from "./attempts-history";
import StartQuizButton from "./start-quiz-button";

type QuizAttemptOverviewProps = {
  quiz: Quiz;
  questionsCount?: number;
  onAttemptReady: (attempt: QuizAttempt) => void;
};

export default function QuizAttemptOverview({
  quiz,
  questionsCount,
  onAttemptReady,
}: QuizAttemptOverviewProps) {
  const { data: attempts = [], isLoading, isError } = useGetMyAttempts(quiz.id);

  const activeAttempt = attempts.find(
    (attempt) => attempt.status === "in_progress",
  );

  const hasReachedMaximumAttempts =
    !activeAttempt && attempts.length >= quiz.maxAttempts;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>

              <p className="mt-2 text-sm text-muted-foreground">
                Review the quiz details before starting your attempt.
              </p>
            </div>

            {!isLoading && !isError && (
              <StartQuizButton
                quizId={quiz.id}
                activeAttempt={activeAttempt}
                attemptsCount={attempts.length}
                maxAttempts={quiz.maxAttempts}
                onAttemptReady={onAttemptReady}
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
          {typeof questionsCount === "number" && (
            <QuizDetail
              icon={CircleHelp}
              label="Questions"
              value={questionsCount.toString()}
            />
          )}

          <QuizDetail
            icon={Award}
            label="Passing score"
            value={`${quiz.passingScore}%`}
          />

          <QuizDetail
            icon={RotateCcw}
            label="Maximum attempts"
            value={quiz.maxAttempts.toString()}
          />

          <QuizDetail
            icon={ListChecks}
            label="Attempts used"
            value={`${attempts.length} / ${quiz.maxAttempts}`}
          />
        </CardContent>
      </Card>

      {hasReachedMaximumAttempts && (
        <Alert>
          <AlertDescription>
            You have used all available attempts for this quiz.
          </AlertDescription>
        </Alert>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">My Attempts</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View your previous results or continue an active attempt.
          </p>
        </div>

        <AttemptsHistory
          attempts={attempts}
          totalMark={quiz.totalMark}
          isLoading={isLoading}
          isError={isError}
          onContinue={onAttemptReady}
        />
      </section>
    </div>
  );
}

type QuizDetailProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function QuizDetail({ icon: Icon, label, value }: QuizDetailProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
