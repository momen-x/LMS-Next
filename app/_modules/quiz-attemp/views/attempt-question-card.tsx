"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Question } from "@/app/_modules/question/entity/question";
import { Choice } from "@/app/_modules/choice/entity/choice";

import ChoiceOption from "./choice-option";

type AttemptQuestionCardProps = {
  question: Question;
  choices: Choice[];
  questionIndex: number;
  totalQuestions: number;
  selectedChoiceId?: string;
  savingChoiceId?: string;
  isSaving?: boolean;
  onSelectChoice: (choiceId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function AttemptQuestionCard({
  question,
  choices,
  questionIndex,
  totalQuestions,
  selectedChoiceId,
  savingChoiceId,
  isSaving = false,
  onSelectChoice,
  onPrevious,
  onNext,
}: AttemptQuestionCardProps) {
  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex === totalQuestions - 1;

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <Card>
      <CardHeader className="space-y-4 border-b">
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium">
            Question {questionIndex + 1} of {totalQuestions}
          </p>

          <span className="text-sm text-muted-foreground">Multiple Choice</span>
        </div>

        <Progress value={progress} />
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <h2 className="text-xl font-semibold leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {choices.map((choice, index) => (
            <ChoiceOption
              key={choice.id}
              choice={choice}
              index={index}
              selected={selectedChoiceId === choice.id}
              disabled={isSaving}
              isSaving={
                isSaving &&
                selectedChoiceId === choice.id &&
                savingChoiceId === choice.id
              }
              onSelect={onSelectChoice}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-5">
          <Button
            type="button"
            variant="outline"
            disabled={isFirstQuestion}
            onClick={onPrevious}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>

          <Button type="button" disabled={isLastQuestion} onClick={onNext}>
            Next Question
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
