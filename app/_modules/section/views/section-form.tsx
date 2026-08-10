/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createSectionSchema,
  CreateSectionData,
} from "../dto/create-section";

interface SectionFormProps {
  defaultValues?: CreateSectionData;
  isPending?: boolean;
  submitLabel: string;
  onSubmit: (data: CreateSectionData) => void | Promise<void>;
  onCancel?: () => void;
}

const INITIAL_VALUES: CreateSectionData = {
  title: "",
};

export default function SectionForm({
  defaultValues,
  isPending = false,
  submitLabel,
  onSubmit,
  onCancel,
}: SectionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateSectionData>({
    resolver: zodResolver(createSectionSchema as any),
    defaultValues: defaultValues ?? INITIAL_VALUES,
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="section-title">Section title</Label>

            <Input
              {...field}
              id="section-title"
              placeholder="Enter section title"
              disabled={isPending}
              aria-invalid={Boolean(errors.title)}
            />

            {errors.title?.message && (
              <p className="text-sm text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={isPending || !isValid}
        >
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
