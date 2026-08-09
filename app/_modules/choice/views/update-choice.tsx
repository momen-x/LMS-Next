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
import { Choice } from "../entity/choice";
import { useUpdateChoice } from "../hooks/useUpdateChoice";

import ChoiceForm from "./choice-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface UpdateChoiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  choice: Choice | null;
}

export default function UpdateChoice({
  open,
  onOpenChange,
  choice,
}: UpdateChoiceProps) {
  const { mutateAsync: updateChoice, isPending } = useUpdateChoice();

  const handleSubmit = async (data: CreateChoiceData) => {
    if (!choice) {
      return;
    }

    try {
      await updateChoice({
        choiceId: choice.id,
        questionId: choice.questionId,
        data,
      });

      toast.success("Choice updated successfully");
      onOpenChange(false);
    } catch (error){
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to update choice");
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
          <DialogTitle>Update choice</DialogTitle>

          <DialogDescription>
            Update the selected answer choice.
          </DialogDescription>
        </DialogHeader>

        {choice && (
          <ChoiceForm
            key={choice.id}
            defaultValues={{
              text: choice.text,
              isCorrect: choice.isCorrect ?? false,
            }}
            submitLabel="Update choice"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
