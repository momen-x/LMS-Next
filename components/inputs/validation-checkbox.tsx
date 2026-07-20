"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Props<T> = {
  fieldTitle?: string;
  nameInSchema: keyof T & string;
  message: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function ValidationCheckbox<T>({
  fieldTitle,
  nameInSchema,
  message,
  className,
  disabled = false,
}: Props<T>) {
  const form = useFormContext();

  return (
    <Controller
      name={nameInSchema}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <div className="flex items-start gap-2.5">
            <Checkbox
              disabled={disabled}
              id={nameInSchema}
              aria-invalid={fieldState.invalid}
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0 rounded-sm",
                "disabled:opacity-50",
                className,
              )}
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={nameInSchema}
              className="text-sm leading-snug text-muted-foreground cursor-pointer"
            >
              {fieldTitle && (
                <span className="block text-foreground font-medium mb-0.5">
                  {fieldTitle}
                </span>
              )}
              {message}
            </label>
          </div>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="mt-1.5 ml-6.5" />
          )}
        </Field>
      )}
    />
  );
}
