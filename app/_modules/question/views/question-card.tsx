"use client";

import { CircleHelp, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import QuestionChoices from "@/app/_modules/choice/views/question-choices";

import { Question } from "../entity/question";
import { useQuestionDialog } from "../context/question-dialog-context";

interface QuestionCardProps {
  question: Question;
  index: number;
  onDelete?: (question: Question) => void;
}

export default function QuestionCard({
  question,
  index,
  onDelete,
}: QuestionCardProps) {
  const { openUpdateQuestion } = useQuestionDialog();

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
                className="size-8"
                aria-label={`Open actions for question ${index + 1}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="z-50 w-40">
            <DropdownMenuItem onClick={() => openUpdateQuestion(question)}>
              <Pencil className="mr-2 size-3.5" />
              Edit question
            </DropdownMenuItem>

            {onDelete && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onDelete(question)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-3.5" />
                  Delete question
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 border-t pt-4">
        <QuestionChoices questionId={question.id} />
      </div>
    </article>
  );
}
