"use client";

import {
  CircleHelp,
  MoreHorizontal,
  RotateCcw,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Quiz } from "../entity/quiz";

import DeleteQuiz from "./delete-quiz";
import UpdateQuiz from "./update-quiz";

interface QuizItemProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizItemProps) {
  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CircleHelp className="size-5 text-muted-foreground" />
            </div>

            <h4 className="truncate font-semibold">{quiz.title}</h4>

            <Badge variant="secondary">Quiz</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Target className="size-4" />

              <span>
                Passing score:
                <strong className="ml-1 font-medium text-foreground">
                  {quiz.passingScore}%
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw className="size-4" />

              <span>
                Maximum attempts:
                <strong className="ml-1 font-medium text-foreground">
                  {quiz.maxAttempts}
                </strong>
              </span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Open actions for ${quiz.title}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <UpdateQuiz quiz={quiz} />

            <DeleteQuiz
              quizId={quiz.id}
              lessonId={quiz.lessonId}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}