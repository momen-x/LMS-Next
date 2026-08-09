"use client";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateQuestionsBankData } from "../dto/questions-bank.dto";
import { QuestionsBank } from "../entity/question-bank";
import { useUpdateQuestionsBank } from "../hooks/useUpdateQuestionBank";

import QuizForm from "./question-bank-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface UpdateQuestionsBankProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionsBank: QuestionsBank | null;
}

export default function UpdateQuestionsBank({
  open,
  onOpenChange,
  questionsBank,
}: UpdateQuestionsBankProps) {
  const { mutateAsync: updateQuestionsBank, isPending } =
    useUpdateQuestionsBank();

  const handleSubmit = async (data: CreateQuestionsBankData) => {
    if (!questionsBank) {
      return;
    }

    try {
      await updateQuestionsBank({
        questionsBankId: questionsBank.id,
        courseId: questionsBank.courseId,
        data,
      });

      toast.success("Question bank updated successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to update question bank");
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
          <DialogTitle>Update question bank</DialogTitle>

          <DialogDescription>
            Update the question bank&apos;s title, passing score, or maximum
            attempts.
          </DialogDescription>
        </DialogHeader>

        {questionsBank && (
          <QuizForm
            key={questionsBank.id}
            defaultValues={{
              title: questionsBank.title,
            }}
            submitLabel="Update question bank"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
