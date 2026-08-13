"use client";

import { Check, Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { StudentAttemptView } from "../../entities/start-quiz";

interface QuizQuestionNavigatorProps {
  questions: StudentAttemptView["questions"];
  selectedAnswers: Record<string, string | null>;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

export default function QuizQuestionNavigator({
  questions,
  selectedAnswers,
  currentQuestionIndex,
  onQuestionSelect,
}: QuizQuestionNavigatorProps) {
  const answeredCount = questions.filter((question) =>
    Boolean(selectedAnswers[question.id]),
  ).length;

  return (
    <aside className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">Questions</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {answeredCount} of {questions.length} answered
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isCurrent = currentQuestionIndex === index;

          const isAnswered = Boolean(selectedAnswers[question.id]);

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onQuestionSelect(index)}
              aria-label={`Go to question ${index + 1}`}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg border text-sm font-medium transition",
                isCurrent &&
                  "border-primary bg-primary text-primary-foreground",
                !isCurrent &&
                  isAnswered &&
                  "border-primary/40 bg-primary/10 text-foreground",
                !isCurrent &&
                  !isAnswered &&
                  "text-muted-foreground hover:bg-muted",
              )}
            >
              {isAnswered && !isCurrent ? (
                <Check className="size-4" />
              ) : (
                index + 1
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <LegendItem
          icon={<span className="size-3 rounded-sm bg-primary" />}
          label="Current"
        />

        <LegendItem
          icon={<Check className="size-3.5 text-primary" />}
          label="Answered"
        />

        <LegendItem
          icon={<Circle className="size-3.5" />}
          label="Not answered"
        />
      </div>
    </aside>
  );
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-4 items-center justify-center">{icon}</span>

      <span>{label}</span>
    </div>
  );
}
