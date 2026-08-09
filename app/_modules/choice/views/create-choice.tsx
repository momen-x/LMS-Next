"use client";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateChoiceData } from "../dto/create-choice";
import { useCreateChoice } from "../hooks/useCreateChoice";

import ChoiceForm from "./choice-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface CreateChoiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionId: string | null;
  choicesCount: number;
}

export default function CreateChoice({
  open,
  onOpenChange,
  questionId,
  choicesCount,
}: CreateChoiceProps) {
  const { mutateAsync: createChoice, isPending } = useCreateChoice();

  const reachedLimit = choicesCount >= 5;

  const handleSubmit = async (data: CreateChoiceData) => {
    if (!questionId || reachedLimit) {
      return;
    }

    try {
      await createChoice({
        questionId,
        data,
      });

      toast.success("Choice created successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to create choice");
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
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create choice</DialogTitle>

          <DialogDescription>
            Add an answer choice to this question.
          </DialogDescription>
        </DialogHeader>

        {questionId && !reachedLimit && (
          <ChoiceForm
            key={`${questionId}-${choicesCount}`}
            submitLabel="Create choice"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
