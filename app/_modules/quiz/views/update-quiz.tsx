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
import { Quiz } from "../entity/quiz";
import { useUpdateQuiz } from "../hooks/useUpdateQuiz";

import QuizForm from "./quiz-form";

interface UpdateQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: Quiz | null;
}

export default function UpdateQuiz({
  open,
  onOpenChange,
  quiz,
}: UpdateQuizProps) {
  const { mutateAsync: updateQuiz, isPending } = useUpdateQuiz();

  const handleSubmit = async (data: CreateQuizData) => {
    if (!quiz) {
      return;
    }

    try {
      await updateQuiz({
        quizId: quiz.id,
        lessonId: quiz.lessonId,
        data,
      });

      toast.success("Quiz updated successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to update quiz");
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
          <DialogTitle>Update quiz</DialogTitle>

          <DialogDescription>
            Update the quiz title, passing score, or maximum attempts.
          </DialogDescription>
        </DialogHeader>

        {quiz && (
          <QuizForm
            key={quiz.id}
            defaultValues={{
              title: quiz.title,
              passingScore: quiz.passingScore,
              maxAttempts: quiz.maxAttempts,
            }}
            submitLabel="Update quiz"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
