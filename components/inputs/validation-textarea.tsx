"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaWithLabelProps<T extends FieldValues> = {
  fieldTitle: React.ReactNode;
  nameInSchema: FieldPath<T>;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

export default function ValidationTextarea<T extends FieldValues>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: TextAreaWithLabelProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={nameInSchema}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-1.5">
          <FieldLabel htmlFor={nameInSchema}>{fieldTitle}</FieldLabel>

          <Textarea
            {...props}
            {...field}
            id={nameInSchema}
            value={field.value ?? ""}
            aria-invalid={fieldState.invalid}
            style={{ resize: "none" }}
            className={cn(
              "w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-300 disabled:opacity-75",
              fieldState.invalid && "border-destructive bg-destructive/5",
              className,
            )}
          />

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
