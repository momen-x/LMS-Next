"use client";

import { cn } from "@/lib/utils";

type QuestionNavigatorProps = {
  questionIds: string[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  onSelectQuestion: (index: number) => void;
};

export default function QuestionNavigator({
  questionIds,
  currentQuestionIndex,
  answers,
  onSelectQuestion,
}: QuestionNavigatorProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="font-semibold">Question Navigator</h2>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {questionIds.map((questionId, index) => {
          const isCurrent = index === currentQuestionIndex;
          const isAnswered = Boolean(answers[questionId]);

          return (
            <button
              key={questionId}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                "hover:border-primary hover:bg-primary/5",
                isAnswered &&
                  !isCurrent &&
                  "border-green-500 bg-green-50 text-green-700",
                isCurrent &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-2 border-t pt-4 text-sm">
        <NavigatorLegend className="bg-green-500" label="Answered" />

        <NavigatorLegend className="bg-primary" label="Current question" />

        <NavigatorLegend
          className="border bg-background"
          label="Not answered"
        />
      </div>
    </div>
  );
}

type NavigatorLegendProps = {
  className: string;
  label: string;
};

function NavigatorLegend({ className, label }: NavigatorLegendProps) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className={cn("size-3 rounded-full", className)} />
      {label}
    </div>
  );
}
