"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DataObj = {
  id: string;
  description: string;
};

type SelectWithLabelProps<T extends FieldValues> = {
  fieldTitle: React.ReactNode;
  nameInSchema: FieldPath<T>;
  data: DataObj[];
  className?: string;
};

export default function ValidationSelect<T extends FieldValues>({
  fieldTitle,
  nameInSchema,
  data,
  className,
}: SelectWithLabelProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={nameInSchema}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-1.5">
          <FieldLabel htmlFor={nameInSchema}>{fieldTitle}</FieldLabel>

          <Select value={field.value ?? ""} onValueChange={field.onChange}>
            <SelectTrigger
              id={nameInSchema}
              aria-invalid={fieldState.invalid}
              className={cn(
                "w-full max-w-xs",
                fieldState.invalid && "border-destructive bg-destructive/5",
                className,
              )}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent>
              {data.map((item) => (
                <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
