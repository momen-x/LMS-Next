"use client";

import {
  CheckCircle2,
  Circle,
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
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Choice } from "../entity/choice";


import { useChoiceDialog } from "../context/choice-dialog-context";

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onDelete?: string;
}

export default function ChoiceCard({ choice, index, onDelete }: ChoiceCardProps) {
  const canSeeCorrectState = typeof choice.isCorrect === "boolean";

  const { openUpdateChoice } = useChoiceDialog();

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
                  className="size-8 "
                  aria-label="Lesson options"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              }
            />

            <DropdownMenuContent align="end" className="z-50 w-40">
         

              <DropdownMenuItem
                onClick={() => {
                  openUpdateChoice(choice);
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
        )}
      </div>
    </article>
  );
}
