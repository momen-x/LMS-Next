/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CreateLessonData, createLessonSchema } from "../dto/create-lesson";

interface LessonFormProps {
  defaultValues?: Partial<CreateLessonData>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: CreateLessonData) => Promise<void> | void;
}

export default function LessonForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: LessonFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateLessonData>({
    resolver: zodResolver(createLessonSchema as any),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      isPreview: defaultValues?.isPreview ?? false,
    },
  });

  const isPreview = watch("isPreview");

  const submitForm = (data: CreateLessonData) => {
    const normalizedData: CreateLessonData = {
      ...data,
      description: data.description?.trim() || undefined,
    };

    return onSubmit(normalizedData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="lesson-title">Lesson title</Label>

        <Input
          id="lesson-title"
          placeholder="Introduction to TypeScript"
          disabled={isPending}
          {...register("title")}
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="lesson-description">Description</Label>

          <span className="text-xs text-muted-foreground">Optional</span>
        </div>

        <Textarea
          id="lesson-description"
          placeholder="Write a short description of this lesson..."
          rows={4}
          disabled={isPending}
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-lg border p-4">
        <Checkbox
          id="lesson-preview"
          checked={isPreview ?? false}
          disabled={isPending}
          onCheckedChange={(checked) => {
            setValue("isPreview", checked === true, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        <div className="space-y-1">
          <Label htmlFor="lesson-preview" className="cursor-pointer">
            Free preview
          </Label>

          <p className="text-sm text-muted-foreground">
            Allow users to view this lesson before enrolling.
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
