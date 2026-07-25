"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { CreateQuizData } from "../dto/create-quiz";
import { Quiz } from "../entity/quiz";
import { useUpdateQuiz } from "../hooks/useUpdateQuiz";

import QuizForm from "./quiz-form";

interface UpdateQuizProps {
  quiz: Quiz;
}

export default function UpdateQuiz({ quiz }: UpdateQuizProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateQuiz, isPending } = useUpdateQuiz();

  const handleSubmit = async (data: CreateQuizData) => {
    try {
      await updateQuiz({
        quizId: quiz.id,
        lessonId: quiz.lessonId,
        data,
      });

      toast.success("Quiz updated successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to update quiz");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger
        render={
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              setOpen(true);
            }}
          >
            <Pencil className="size-4" />
            Edit quiz
          </DropdownMenuItem>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update quiz</DialogTitle>

          <DialogDescription>
            Update the quiz title, passing score, or maximum attempts.
          </DialogDescription>
        </DialogHeader>

        <QuizForm
          defaultValues={{
            title: quiz.title,
            passingScore: quiz.passingScore,
            maxAttempts: quiz.maxAttempts,
          }}
          submitLabel="Update quiz"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
