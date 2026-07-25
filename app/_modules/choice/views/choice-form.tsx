/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CreateChoiceData, createChoiceSchema } from "../dto/create-choice";

interface ChoiceFormProps {
  defaultValues?: Partial<CreateChoiceData>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: CreateChoiceData) => Promise<void> | void;
}

export default function ChoiceForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: ChoiceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateChoiceData>({
    resolver: zodResolver(createChoiceSchema as any),
    mode: "onChange",
    defaultValues: {
      text: defaultValues?.text ?? "",
      isCorrect: defaultValues?.isCorrect ?? false,
    },
  });

  const isCorrect = watch("isCorrect");

  const submitForm = (data: CreateChoiceData) => {
    return onSubmit({
      text: data.text.trim(),
      isCorrect: data.isCorrect,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="choice-text">Choice text</Label>

        <Input
          id="choice-text"
          placeholder="Write the answer choice..."
          disabled={isPending}
          {...register("text")}
        />

        {errors.text && (
          <p className="text-sm text-destructive">{errors.text.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-lg border p-4">
        <Checkbox
          id="choice-correct"
          checked={isCorrect}
          disabled={isPending}
          onCheckedChange={(checked) => {
            setValue("isCorrect", checked === true, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        <div className="space-y-1">
          <Label htmlFor="choice-correct" className="cursor-pointer">
            Correct answer
          </Label>

          <p className="text-sm text-muted-foreground">
            Mark this choice as the correct answer for the question.
          </p>
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
