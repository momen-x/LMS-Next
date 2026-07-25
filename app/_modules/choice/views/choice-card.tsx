"use client";

import { CheckCircle2, Circle, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Choice } from "../entity/choice";

import DeleteChoice from "./delete-choice";
import UpdateChoice from "./update-choice";

interface ChoiceCardProps {
  choice: Choice;
  index: number;
}

export default function ChoiceCard({ choice, index }: ChoiceCardProps) {
  const canSeeCorrectState = typeof choice.isCorrect === "boolean";

  return (
    <article className="rounded-lg border bg-background p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
            {index + 1}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <p className="whitespace-pre-wrap text-sm leading-6">
              {choice.text}
            </p>

            {canSeeCorrectState && (
              <div>
                {choice.isCorrect ? (
                  <Badge className="gap-1">
                    <CheckCircle2 className="size-3.5" />
                    Correct answer
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Circle className="size-3.5" />
                    Incorrect answer
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {canSeeCorrectState && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Open actions for choice ${index + 1}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <UpdateChoice choice={choice} />

              <DeleteChoice
                choiceId={choice.id}
                questionId={choice.questionId}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </article>
  );
}
