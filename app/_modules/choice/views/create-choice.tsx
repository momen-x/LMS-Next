"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
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

import { CreateChoiceData } from "../dto/create-choice";
import { useCreateChoice } from "../hooks/useCreateChoice";

import ChoiceForm from "./choice-form";

interface CreateChoiceProps {
  questionId: string;
  choicesCount: number;
}

export default function CreateChoice({
  questionId,
  choicesCount,
}: CreateChoiceProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createChoice, isPending } = useCreateChoice();

  const reachedLimit = choicesCount >= 5;

  const handleSubmit = async (data: CreateChoiceData) => {
    try {
      await createChoice({
        questionId,
        data,
      });

      toast.success("Choice created successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to create choice");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending && !reachedLimit) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={reachedLimit}
            title={
              reachedLimit
                ? "A question cannot have more than 5 choices"
                : undefined
            }
          >
            <Plus className="size-4" />
            Add choice
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create choice</DialogTitle>

          <DialogDescription>
            Add an answer choice to this question.
          </DialogDescription>
        </DialogHeader>

        <ChoiceForm
          submitLabel="Create choice"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
