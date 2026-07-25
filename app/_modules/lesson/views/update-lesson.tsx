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

import { CreateLessonData } from "../dto/create-lesson";
import { Lesson } from "../entity/lesson";
import { useUpdateLesson } from "../hooks/useUpdateLesson";

import LessonForm from "./lesson-form";

interface UpdateLessonProps {
  lesson: Lesson;
}

export default function UpdateLesson({ lesson }: UpdateLessonProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateLesson, isPending } = useUpdateLesson();

  const handleSubmit = async (data: CreateLessonData) => {
    try {
      await updateLesson({
        lessonId: lesson.id,
        data,
      });

      toast.success("Lesson updated successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to update lesson");
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
            }}
          >
            <Pencil className="size-4" />
            Edit lesson
          </DropdownMenuItem>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update lesson</DialogTitle>

          <DialogDescription>
            Update the lesson details and resources.
          </DialogDescription>
        </DialogHeader>

        <LessonForm
          defaultValues={{
            title: lesson.title,
            description: lesson.description ?? "",
            duration: lesson.duration,
            isPreview: lesson.isPreview,
            resources: lesson.resources ?? [],
          }}
          submitLabel="Save changes"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
