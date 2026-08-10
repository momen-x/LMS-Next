"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UpdateLessonData } from "../dto/update-lesson";
import { useGetLesson } from "../hooks/useGetLesson";
import { useUpdateLesson } from "../hooks/useUpdateLesson";

import LessonForm from "./lesson-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface UpdateLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonId: string | null;
}

export default function UpdateLessonDialog({
  open,
  onOpenChange,
  lessonId,
}: UpdateLessonDialogProps) {
  const { mutateAsync: updateLesson, isPending } =
    useUpdateLesson();

  const {
    data: lesson,
    isLoading,
    isError,
    refetch,
  } = useGetLesson(lessonId ?? "", open && Boolean(lessonId));

  const handleSubmit = async (data: UpdateLessonData) => {
    if (!lessonId) {
      return;
    }

    try {
      await updateLesson({
        lessonId,
        data,
      });

      toast.success("Lesson updated successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to update lesson");
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
      <DialogContent className="max-h-[90dvh] overflow-y-auto overscroll-contain sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update lesson</DialogTitle>

          <DialogDescription>
            Update the editable lesson details.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex min-h-52 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center">
            <AlertCircle className="mx-auto mb-3 size-6 text-destructive" />

            <p className="font-medium">
              Failed to load lesson
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Something went wrong while loading this lesson.
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !isError && lesson && (
          <>
            <LessonForm
              key={lesson.id}
              defaultValues={{
                title: lesson.title,
                description: lesson.description ?? "",
                isPreview: lesson.isPreview,
              }}
              submitLabel="Save changes"
              isPending={isPending}
              onSubmit={handleSubmit}
            />

            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                  />
                }
              >
                Cancel
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
