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

interface CreateQuestionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: string | null;
}

export default function CreateQuestion({
  open,
  onOpenChange,
  quizId,
}: CreateQuestionProps) {
  const { mutateAsync: createQuestion, isPending } = useCreateQuestion();

  const handleSubmit = async (data: CreateQuestionData) => {
    if (!quizId) {
      return;
    }

    try {
      await createQuestion({
        quizId,
        data,
      });

      toast.success("Question created successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to create question");
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
            Add a new question to this quiz.
          </DialogDescription>
        </DialogHeader>

        {quizId && (
          <QuestionForm
            key={quizId}
            submitLabel="Create question"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
