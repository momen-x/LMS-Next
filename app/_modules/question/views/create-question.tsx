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

import { CreateQuestionData } from "../dto/create-question";
import { useCreateQuestion } from "../hooks/useCreateQuestion";

import QuestionForm from "./question-form";

interface CreateQuestionProps {
  quizId: string;
}

export default function CreateQuestion({ quizId }: CreateQuestionProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createQuestion, isPending } = useCreateQuestion();

  const handleSubmit = async (data: CreateQuestionData) => {
    try {
      await createQuestion({
        quizId,
        data,
      });

      toast.success("Question created successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to create question");
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
            Add question
          </Button>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create question</DialogTitle>

          <DialogDescription>
            Add a new question to this quiz.
          </DialogDescription>
        </DialogHeader>

        <QuestionForm
          submitLabel="Create question"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
