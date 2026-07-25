/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CreateQuizData, createQuizSchema } from "../dto/create-quiz";

interface QuizFormProps {
  defaultValues?: Partial<CreateQuizData>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: CreateQuizData) => Promise<void> | void;
}

export default function QuizForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: QuizFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateQuizData>({
    resolver: zodResolver(createQuizSchema as any),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      passingScore: defaultValues?.passingScore ?? 50,
      maxAttempts: defaultValues?.maxAttempts ?? 1,
    },
  });

  const submitForm = (data: CreateQuizData) => {
    const normalizedData: CreateQuizData = {
      title: data.title.trim(),
      passingScore: data.passingScore,
      maxAttempts: data.maxAttempts,
    };

    return onSubmit(normalizedData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="quiz-title">Quiz title</Label>

        <Input
          id="quiz-title"
          placeholder="JavaScript fundamentals quiz"
          disabled={isPending}
          {...register("title")}
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="quiz-passing-score">Passing score percentage</Label>

          <Input
            id="quiz-passing-score"
            type="number"
            min={0}
            max={100}
            step={1}
            placeholder="50"
            disabled={isPending}
            {...register("passingScore")}
          />

          <p className="text-xs text-muted-foreground">
            The minimum score required to pass the quiz.
          </p>

          {errors.passingScore && (
            <p className="text-sm text-destructive">
              {errors.passingScore.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quiz-max-attempts">Maximum attempts</Label>

          <Input
            id="quiz-max-attempts"
            type="number"
            min={1}
            step={1}
            placeholder="1"
            disabled={isPending}
            {...register("maxAttempts")}
          />

          <p className="text-xs text-muted-foreground">
            The number of times a student can attempt this quiz.
          </p>

          {errors.maxAttempts && (
            <p className="text-sm text-destructive">
              {errors.maxAttempts.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end border-t pt-5">
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending && <Loader2 className="size-4 animate-spin" />}

          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
