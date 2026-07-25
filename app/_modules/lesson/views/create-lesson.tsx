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

import { CreateLessonData } from "../dto/create-lesson";
import { useCreateLesson } from "../hooks/useCreateLesson";

import LessonForm from "./lesson-form";

interface CreateLessonProps {
  sectionId: string;
}

export default function CreateLesson({ sectionId }: CreateLessonProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createLesson, isPending } = useCreateLesson();

  const handleSubmit = async (data: CreateLessonData) => {
    try {
      await createLesson({
        sectionId,
        data,
      });

      toast.success("Lesson created successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to create lesson");
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
            Add lesson
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create lesson</DialogTitle>

          <DialogDescription>
            Add a new lesson to this section.
          </DialogDescription>
        </DialogHeader>

        <LessonForm
          submitLabel="Create lesson"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
