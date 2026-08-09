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
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface CreateQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
}

export default function CreateQuiz({
  open,
  onOpenChange,
  courseId,
}: CreateQuizProps) {
  const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

  const handleSubmit = async (data: CreateQuizData) => {
    try {
      await createQuiz({
        courseId,
        data,
      });

      toast.success("Quiz created successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to create quiz");
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

          <DialogDescription>Add a new quiz to this course.</DialogDescription>
        </DialogHeader>

        <QuizForm
          key={courseId}
          courseId={courseId}
          submitLabel="Create quiz"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
