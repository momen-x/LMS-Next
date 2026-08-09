"use client";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateQuestionData } from "../dto/create-question";
import { Question } from "../entity/question";
import { useUpdateQuestion } from "../hooks/useUpdateQuestion";

import QuestionForm from "./question-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface UpdateQuestionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

export default function UpdateQuestion({
  open,
  onOpenChange,
  question,
}: UpdateQuestionProps) {
  const { mutateAsync: updateQuestion, isPending } = useUpdateQuestion();

  const handleSubmit = async (data: CreateQuestionData) => {
    if (!question) {
      return;
    }

    try {
      await updateQuestion({
        questionId: question.id,
        questionBankId: question.questionBankId,
        data,
      });

      toast.success("Question updated successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to update question");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update question</DialogTitle>

          <DialogDescription>
            Update the selected question-bank question.
          </DialogDescription>
        </DialogHeader>

        {question && (
          <QuestionForm
            key={question.id}
            defaultValues={{
              text: question.text,
            }}
            submitLabel="Update question"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
