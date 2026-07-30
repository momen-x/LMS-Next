"use client";

import {
  CircleHelp,
  MoreHorizontal,
  Pencil,
  ReceiptText,
  RotateCcw,
  Target,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import QuizQuestions from "@/app/_modules/question/views/quiz-questions";

import { Quiz } from "../entity/quiz";
import { useQuizDialog } from "../context/quiz-dialog-context";
import { ChoiceDialogProvider } from "../../choice/context/choice-dialog-context";
import { QuestionDialogProvider } from "../../question/context/question-dialog-context";

interface QuizItemProps {
  quiz: Quiz;
  onView?: string;
  onDelete?: string;
}

export default function QuizCard({ quiz, onView, onDelete }: QuizItemProps) {
  const { openUpdateQuiz } = useQuizDialog();

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
                className="size-8 "
                aria-label="Lesson options"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="z-50 w-40">
            <>
              <DropdownMenuLinkItem href={onView}>
                <ReceiptText className="mr-2 size-3.5" />
                View
              </DropdownMenuLinkItem>

              <DropdownMenuSeparator />
            </>

            <DropdownMenuItem
              onClick={() => {
                openUpdateQuiz(quiz);
              }}
            >
              <Pencil className="mr-2 size-3.5" />
              Edit
            </DropdownMenuItem>

            <>
              <DropdownMenuSeparator />

              <DropdownMenuLinkItem
                href={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 size-3.5" />
                Delete
              </DropdownMenuLinkItem>
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-5 border-t pt-5">
        <QuestionDialogProvider>
          <ChoiceDialogProvider>
            <QuizQuestions quizId={quiz.id} />
          </ChoiceDialogProvider>
        </QuestionDialogProvider>
      </div>
    </article>
  );
}
