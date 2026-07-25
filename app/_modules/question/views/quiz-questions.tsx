"use client";

import { AlertCircle, CircleHelp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetQuizQuestions } from "../hooks/useGetQuizQuestions";

import CreateQuestion from "./create-question";
import QuestionCard from "./question-card";

interface QuizQuestionsProps {
  quizId: string;
}

export default function QuizQuestions({ quizId }: QuizQuestionsProps) {
  const {
    data: questions,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useGetQuizQuestions(quizId);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold">Questions</h4>

          <p className="text-sm text-muted-foreground">
            Manage the questions belonging to this quiz.
          </p>
        </div>

        <CreateQuestion quizId={quizId} />
      </div>

      {isPending && (
        <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-center">
          <AlertCircle className="size-6 text-destructive" />

          <div>
            <p className="font-medium">Failed to load questions</p>

            <p className="text-sm text-muted-foreground">
              An error occurred while loading the quiz questions.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching && <Loader2 className="size-4 animate-spin" />}
            Try again
          </Button>
        </div>
      )}

      {!isPending && !isError && questions?.length === 0 && (
        <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
            <CircleHelp className="size-5 text-muted-foreground" />
          </div>

          <p className="font-medium">No questions yet</p>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            This quiz does not contain any questions. Add the first question to
            begin building the quiz.
          </p>
        </div>
      )}

      {!isPending && !isError && Boolean(questions?.length) && (
        <div className="space-y-3">
          {questions?.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
