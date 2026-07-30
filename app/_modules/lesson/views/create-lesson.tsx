"use client";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import LessonForm from "./lesson-form";
import { useCreateLesson } from "../hooks/useCreateLesson";
import { CreateLessonData } from "../dto/create-lesson";

interface CreateLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionId: string | null;
}

export default function CreateLessonDialog({
  open,
  onOpenChange,
  sectionId,
}: CreateLessonDialogProps) {
  const { mutateAsync: createLesson, isPending } = useCreateLesson();

  const handleSubmit = async (data: CreateLessonData) => {
    if (!sectionId) return;

    try {
      await createLesson({ sectionId, data });
      toast.success("Lesson created successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to create lesson");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto overscroll-contain sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Lesson</DialogTitle>
          <DialogDescription>
            Add a new lesson to this section.
          </DialogDescription>
        </DialogHeader>

        {/* Key forces a clean form remount per section, resetting fields
            when switching from one section's dialog to another's */}
        <LessonForm
          key={sectionId}
          submitLabel="Create Lesson"
          isPending={isPending}
          onSubmit={handleSubmit}
        />

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline" disabled={isPending} />
            }
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
