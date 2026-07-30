"use client";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateQuizData } from "../dto/create-quiz";
import { useCreateQuiz } from "../hooks/useCreateQuiz";

import QuizForm from "./quiz-form";

interface CreateQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonId: string | null;
}

export default function CreateQuiz({
  open,
  onOpenChange,
  lessonId,
}: CreateQuizProps) {
  const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

  const handleSubmit = async (data: CreateQuizData) => {
    if (!lessonId) {
      return;
    }

    try {
      await createQuiz({
        lessonId,
        data,
      });

      toast.success("Quiz created successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to create quiz");
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
          <DialogTitle>Create quiz</DialogTitle>

          <DialogDescription>Add a new quiz to this lesson.</DialogDescription>
        </DialogHeader>

        {lessonId && (
          <QuizForm
            key={lessonId}
            submitLabel="Create quiz"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
