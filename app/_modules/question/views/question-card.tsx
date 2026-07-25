"use client";

import { CircleHelp, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Question } from "../entity/question";

import DeleteQuestion from "./delete-question";
import UpdateQuestion from "./update-question";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <CircleHelp className="size-5 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Question {index + 1}</Badge>
            </div>

            <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
              {question.text}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Open actions for question ${index + 1}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <UpdateQuestion question={question} />

            <DeleteQuestion questionId={question.id} quizId={question.quizId} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}
