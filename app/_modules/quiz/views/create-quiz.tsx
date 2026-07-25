"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateQuizData } from "../dto/create-quiz";
import { useCreateQuiz } from "../hooks/useCreateQuiz";

import QuizForm from "./quiz-form";

interface CreateQuizProps {
  lessonId: string;
}

export default function CreateQuiz({ lessonId }: CreateQuizProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

  const handleSubmit = async (data: CreateQuizData) => {
    try {
      await createQuiz({
        lessonId,
        data,
      });

      toast.success("Quiz created successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to create quiz");
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
          <Button type="button" variant="outline" size="sm">
            <Plus className="size-4" />
            Add quiz
          </Button>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create quiz</DialogTitle>

          <DialogDescription>Add a new quiz to this lesson.</DialogDescription>
        </DialogHeader>

        <QuizForm
          submitLabel="Create quiz"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
