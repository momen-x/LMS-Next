"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
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

import { CreateChoiceData } from "../dto/create-choice";
import { Choice } from "../entity/choice";
import { useUpdateChoice } from "../hooks/useUpdateChoice";

import ChoiceForm from "./choice-form";

interface UpdateChoiceProps {
  choice: Choice;
}

export default function UpdateChoice({ choice }: UpdateChoiceProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateChoice, isPending } = useUpdateChoice();

  const handleSubmit = async (data: CreateChoiceData) => {
    try {
      await updateChoice({
        choiceId: choice.id,
        questionId: choice.questionId,
        data,
      });

      toast.success("Choice updated successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to update choice");
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
            Edit choice
          </DropdownMenuItem>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update choice</DialogTitle>

          <DialogDescription>
            Update the selected answer choice.
          </DialogDescription>
        </DialogHeader>

        <ChoiceForm
          defaultValues={{
            text: choice.text,
            isCorrect: choice.isCorrect ?? false,
          }}
          submitLabel="Update choice"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
