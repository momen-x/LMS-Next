/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Loader2, Plus, Trash2 } from "lucide-react";

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
    control,
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
      duration: defaultValues?.duration ?? 1,
      isPreview: defaultValues?.isPreview ?? false,
      resources: defaultValues?.resources ?? [],
    },
  });

  const {
    fields: resourceFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "resources",
  });

  const isPreview = watch("isPreview");

  const submitForm = (data: CreateLessonData) => {
    const normalizedData: CreateLessonData = {
      ...data,
      description: data.description?.trim() || undefined,
      resources:
        data.resources && data.resources.length > 0
          ? data.resources
          : undefined,
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

      <div className="space-y-2">
        <Label htmlFor="lesson-duration">Duration in seconds</Label>

        <Input
          id="lesson-duration"
          type="number"
          min={1}
          step={1}
          placeholder="600"
          disabled={isPending}
          {...register("duration")}
        />

        <p className="text-xs text-muted-foreground">
          Example: 600 seconds equals 10 minutes.
        </p>

        {errors.duration && (
          <p className="text-sm text-destructive">{errors.duration.message}</p>
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

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium">Lesson resources</h3>

            <p className="text-sm text-muted-foreground">
              Add links to files, documentation or external resources.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => {
              append({
                title: "",
                url: "",
              });
            }}
          >
            <Plus className="size-4" />
            Add resource
          </Button>
        </div>

        {resourceFields.length === 0 && (
          <div className="rounded-md border border-dashed p-5 text-center">
            <Link2 className="mx-auto mb-2 size-5 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">No resources added.</p>
          </div>
        )}

        <div className="space-y-4">
          {resourceFields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-3 rounded-md bg-muted/40 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Resource {index + 1}</p>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  aria-label={`Remove resource ${index + 1}`}
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`resource-title-${index}`}>
                  Resource title
                </Label>

                <Input
                  id={`resource-title-${index}`}
                  placeholder="Course documentation"
                  disabled={isPending}
                  {...register(`resources.${index}.title`)}
                />

                {errors.resources?.[index]?.title && (
                  <p className="text-sm text-destructive">
                    {errors.resources[index]?.title?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`resource-url-${index}`}>Resource URL</Label>

                <Input
                  id={`resource-url-${index}`}
                  type="url"
                  placeholder="https://example.com/resource"
                  disabled={isPending}
                  {...register(`resources.${index}.url`)}
                />

                {errors.resources?.[index]?.url && (
                  <p className="text-sm text-destructive">
                    {errors.resources[index]?.url?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
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
