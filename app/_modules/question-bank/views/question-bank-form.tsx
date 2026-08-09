/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClosedCaption, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  CreateQuestionsBankData,
  createQuestionsBankSchema,
} from "../dto/questions-bank.dto";
import ValidationInput from "@/components/inputs/validation-input";

interface QuestionBankFormProps {
  defaultValues?: Partial<CreateQuestionsBankData>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: CreateQuestionsBankData) => Promise<void> | void;
}

export default function QuestionBankForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: QuestionBankFormProps) {
  const form = useForm<CreateQuestionsBankData>({
    resolver: zodResolver(createQuestionsBankSchema as any),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
    },
  });

  const submitForm = (data: CreateQuestionsBankData) => {
    const normalizedData: CreateQuestionsBankData = {
      title: data.title.trim(),
    };

    return onSubmit(normalizedData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <ValidationInput<CreateQuestionsBankData>
            fieldTitle={
              <>
                <span className="text-muted-foreground">
                  <ClosedCaption className="h-4 w-4" />
                </span>
                <span className="text-gray-700 dark:text-gray-200">
                  Question Bank Title
                </span>
              </>
            }
            nameInSchema={"title"}
            placeholder="JavaScript fundamentals"
            className="h-10 rounded-xl"
            type={"text"}
          />
        </div>

        <div className="flex justify-end border-t pt-5">
          <Button type="submit" disabled={isPending || !form.formState.isValid}>
            {isPending && <Loader2 className="size-4 animate-spin" />}

            {isPending ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
