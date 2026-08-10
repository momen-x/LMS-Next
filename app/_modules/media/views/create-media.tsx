"use client";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TCreateMedia } from "../dto/create-media";
import { useCreateMedia } from "../hooks/useCreateMedia";

import MediaForm from "./media-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface CreateMediaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonId: string | null;
}

export default function CreateMedia({
  open,
  onOpenChange,
  lessonId,
}: CreateMediaProps) {
  const { mutateAsync: createMedia, isPending } = useCreateMedia();

  const handleSubmit = async (data: TCreateMedia) => {
    if (!lessonId) return;

    try {
      await createMedia({
        lessonId,
        dto: data,
      });

      toast.success("Media uploaded successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to upload media");
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
          <DialogTitle>Add media</DialogTitle>

          <DialogDescription>
            Upload a media file or add an external URL to this lesson.
          </DialogDescription>
        </DialogHeader>

        {lessonId && (
          <MediaForm
            key={lessonId}
            submitLabel="Add media"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
