"use client";

import { AlertCircle, CircleHelp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetLessonQuizzes } from "../hooks/useGetLessonQuizzes";

import CreateQuiz from "./create-quiz";
import QuizCard from "./quiz-card";

interface LessonQuizzesProps {
  lessonId: string;
}

export default function LessonQuizzes({ lessonId }: LessonQuizzesProps) {
  const {
    data: quizzes,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useGetLessonQuizzes(lessonId);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">Quizzes</h3>

          <p className="text-sm text-muted-foreground">
            Manage quizzes attached to this lesson.
          </p>
        </div>

        <CreateQuiz lessonId={lessonId} />
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
            <p className="font-medium">Failed to load quizzes</p>

            <p className="text-sm text-muted-foreground">
              An error occurred while loading the lesson quizzes.
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

      {!isPending && !isError && quizzes?.length === 0 && (
        <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
            <CircleHelp className="size-5 text-muted-foreground" />
          </div>

          <p className="font-medium">No quizzes yet</p>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            This lesson does not contain any quizzes. Create the first quiz to
            start adding questions.
          </p>
        </div>
      )}

      {!isPending && !isError && Boolean(quizzes?.length) && (
        <div className="space-y-3">
          {quizzes?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </section>
  );
}
