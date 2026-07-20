"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type ValidationInputProps<T extends FieldValues> = {
  fieldTitle: React.ReactNode;
  nameInSchema: FieldPath<T>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export default function ValidationInput<T extends FieldValues>({
  fieldTitle,
  nameInSchema,
  className,
  placeholder,
  ...props
}: ValidationInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={nameInSchema}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-1.5">
          <FieldLabel htmlFor={nameInSchema}>{fieldTitle}</FieldLabel>

          <Input
            {...props}
            {...field}
            id={nameInSchema}
            value={field.value ?? ""}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            className={cn(
              "h-11 rounded-lg bg-muted/40",
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
