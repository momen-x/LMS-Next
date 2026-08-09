/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  CreateQuestionData,
  createQuestionSchema,
} from "../dto/create-question";

interface QuestionFormProps {
  defaultValues?: Partial<CreateQuestionData>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: CreateQuestionData) => Promise<void> | void;
}

export default function QuestionForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateQuestionData>({
    resolver: zodResolver(createQuestionSchema as any),
    mode: "onChange",
    defaultValues: {
      text: defaultValues?.text ?? "",
    },
  });

  const submitForm = (data: CreateQuestionData) => {
    return onSubmit({
      text: data.text.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="question-text">Question</Label>

        <Textarea
          id="question-text"
          placeholder="Write the question here..."
          rows={6}
          disabled={isPending}
          {...register("text")}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            {errors.text && (
              <p className="text-sm text-destructive">{errors.text.message}</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">5–1000 characters</p>
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
