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

import { CreateQuestionData } from "../dto/create-question";
import { Question } from "../entity/question";
import { useUpdateQuestion } from "../hooks/useUpdateQuestion";

import QuestionForm from "./question-form";

interface UpdateQuestionProps {
  question: Question;
}

export default function UpdateQuestion({ question }: UpdateQuestionProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateQuestion, isPending } = useUpdateQuestion();

  const handleSubmit = async (data: CreateQuestionData) => {
    try {
      await updateQuestion({
        questionId: question.id,
        quizId: question.quizId,
        data,
      });

      toast.success("Question updated successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to update question");
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
            Edit question
          </DropdownMenuItem>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update question</DialogTitle>

          <DialogDescription>
            Update the selected quiz question.
          </DialogDescription>
        </DialogHeader>

        <QuestionForm
          defaultValues={{
            text: question.text,
          }}
          submitLabel="Update question"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
