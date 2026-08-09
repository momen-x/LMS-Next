/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ValidationInput from "@/components/inputs/validation-input";
import { Button } from "@/components/ui/button";

import { quizFields as fields } from "../utils/question-bank-fields";

import { CreateQuizData, createQuizSchema } from "../dto/create-quiz";
import { useGetCourseQuestionBank } from "../../question-bank/hooks/useGetCourseQuestionBank";
import ValidationSelect from "../../../../components/inputs/validation-select";

interface QuizFormProps {
  courseId: string;
  defaultValues?: Partial<CreateQuizData>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: CreateQuizData) => Promise<void> | void;
}

export default function QuizForm({
  courseId,
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: QuizFormProps) {
  const { data: questionBank, isLoading } =
    useGetCourseQuestionBank(courseId);
  const form = useForm<CreateQuizData>({
    resolver: zodResolver(createQuizSchema as any),
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title ?? "",
      passingScore: defaultValues?.passingScore ?? 50,
      maxAttempts: defaultValues?.maxAttempts ?? 1,
      duration: defaultValues?.duration,
      questionCount: defaultValues?.questionCount,
      totalMark: defaultValues?.totalMark,
      questionBankId: defaultValues?.questionBankId ?? "",
    },
  });

  const submitForm = (data: CreateQuizData) => {
    const normalizedData: CreateQuizData = {
      title: data.title.trim(),
      passingScore: data.passingScore,
      maxAttempts: data.maxAttempts,
      duration: data.duration,
      questionCount: data.questionCount,
      totalMark: data.totalMark,
      questionBankId: data.questionBankId,
    };

    return onSubmit(normalizedData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
        {fields.map(({ name, title, placeholder, Icon, type }) => (
          <div key={name} className="space-y-3 mt-5 mb-5">
            <ValidationInput<CreateQuizData>
              fieldTitle={
                <>
                  <span className="text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    {title}
                  </span>
                </>
              }
              nameInSchema={name as keyof CreateQuizData}
              placeholder={placeholder}
              className="h-10 rounded-xl"
              type={type}
            />
          </div>
        ))}

        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
          </>
        ) : questionBank && questionBank.length > 0 ? (
          <ValidationSelect<CreateQuizData>
            fieldTitle="Question Bank"
            nameInSchema="questionBankId"
            data={questionBank.map(({ questionsBank }) => ({
              id: questionsBank.id,
              description: questionsBank.title,
            }))}
          />
        ) : (
          <p className="mb-4">
            no Question Bank yet, please create one to add quiz
          </p>
        )}

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
