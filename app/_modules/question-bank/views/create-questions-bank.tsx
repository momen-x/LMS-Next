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
import { useCreateQuestionsBank } from "../hooks/useCreateQuestionsBank";

import QuestionBankForm from "./question-bank-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface CreateQuestionBankProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string | null;
}

export default function CreateQuestionBank({
  open,
  onOpenChange,
  courseId,
}: CreateQuestionBankProps) {
  const { mutateAsync: createQuestionsBank, isPending } =
    useCreateQuestionsBank();

  const handleSubmit = async (data: CreateQuestionsBankData) => {
    if (!courseId) {
      return;
    }

    try {
      await createQuestionsBank({
        courseId,
        data,
      });

      toast.success("Question bank created successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to create question bank");
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
          <DialogTitle>Create question bank</DialogTitle>

          <DialogDescription>
            Add a new question bank to this course.
          </DialogDescription>
        </DialogHeader>

        {courseId && (
          <QuestionBankForm
            key={courseId}
            submitLabel="Create question bank"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
