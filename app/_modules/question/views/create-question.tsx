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
import { useCreateQuestion } from "../hooks/useCreateQuestion";

import QuestionForm from "./question-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface CreateQuestionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionBankId: string | null;
}

export default function CreateQuestion({
  open,
  onOpenChange,
  questionBankId,
}: CreateQuestionProps) {
  const { mutateAsync: createQuestion, isPending } = useCreateQuestion();

  const handleSubmit = async (data: CreateQuestionData) => {
    if (!questionBankId) {
      return;
    }

    try {
      await createQuestion({
        questionBankId,
        data,
      });

      toast.success("Question created successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to create question");
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
          <DialogTitle>Create question</DialogTitle>

          <DialogDescription>
            Add a new question to this question bank.
          </DialogDescription>
        </DialogHeader>

        {questionBankId && (
          <QuestionForm
            key={questionBankId}
            submitLabel="Create question"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
