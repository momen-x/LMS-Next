"use client";

import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

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
  isDeleting?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function QuestionCard({
  question,
  index,
  onDelete,
  isDeleting,
  isExpanded,
  onToggle,
}: QuestionCardProps) {
  const { openUpdateQuestion } = useQuestionDialog();

  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`question-content-${question.id}`}
          className="flex min-w-0 flex-1 items-center gap-3 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted">
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </span>

          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <CircleHelp className="size-4 text-muted-foreground" />
          </span>

          <span className="flex min-w-0 flex-1 items-center gap-3">
            <Badge variant="secondary" className="shrink-0">
              Question {index + 1}
            </Badge>
            <span className="truncate text-sm font-medium text-foreground">
              {question.text}
            </span>
          </span>
        </button>

        <div className="p-3">
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
                    disabled={isDeleting}
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
      </div>

      {isExpanded && (
        <div id={`question-content-${question.id}`} className="px-4 pb-4">
          <div className="border-t pt-4">
            <p className="mb-4 whitespace-pre-wrap text-sm leading-6 text-foreground">
              {question.text}
            </p>

            <QuestionChoices questionId={question.id} />
          </div>
        </div>
      )}
    </article>
  );
}
