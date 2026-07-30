"use client";

import { AlertCircle, ListChecks, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useChoiceDialog } from "../context/choice-dialog-context";
import { useGetQuestionChoices } from "../hooks/useGetQuestionChoices";

import ChoiceCard from "./choice-card";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";

interface QuestionChoicesProps {
  questionId: string;
}

export default function QuestionChoices({ questionId }: QuestionChoicesProps) {
  const {
    data: choices,
    isPending,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetQuestionChoices(questionId);

  const { openCreateChoice } = useChoiceDialog();

  const choicesCount = choices?.length ?? 0;
  const reachedLimit = choicesCount >= 5;

  if (isLoading) {
    return <ListSkeleton />;
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h5 className="text-sm font-semibold">Answer choices</h5>

          <p className="text-xs text-muted-foreground">
            Add up to five choices and mark one as correct.
          </p>
        </div>

        {!isPending && !isError && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={reachedLimit}
            title={
              reachedLimit
                ? "A question cannot have more than 5 choices"
                : undefined
            }
            onClick={() => openCreateChoice(questionId, choicesCount)}
          >
            <Plus className="size-4" />
            Add choice
          </Button>
        )}
      </div>

      {isPending && (
        <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-center">
          <AlertCircle className="size-5 text-destructive" />

          <div>
            <p className="text-sm font-medium">Failed to load choices</p>

            <p className="text-xs text-muted-foreground">
              An error occurred while loading this question&apos;s choices.
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

      {!isPending && !isError && choicesCount === 0 && (
        <div className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
          <div className="mb-2 flex size-9 items-center justify-center rounded-full bg-muted">
            <ListChecks className="size-4 text-muted-foreground" />
          </div>

          <p className="text-sm font-medium">No choices yet</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Add answer choices for this question.
          </p>

          <Button
            type="button"
            size="sm"
            className="mt-4"
            onClick={() => openCreateChoice(questionId, choicesCount)}
          >
            <Plus className="size-4" />
            Add choice
          </Button>
        </div>
      )}

      {!isPending && !isError && choicesCount > 0 && (
        <div className="space-y-2">
          {choices?.map((choice, index) => (
            <ChoiceCard key={choice.id} choice={choice} index={index} />
          ))}
        </div>
      )}

      {!isPending && !isError && choicesCount > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{choicesCount} of 5 choices</span>

          {!choices?.some((choice) => choice.isCorrect === true) && (
            <span className="text-destructive">No correct answer selected</span>
          )}
        </div>
      )}
    </section>
  );
}
