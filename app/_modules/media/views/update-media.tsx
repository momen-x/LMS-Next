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
import { useGetMedia } from "../hooks/useGetMedia";
import { useUpdateMedia } from "../hooks/useUpdateMedia";

import MediaForm from "./media-form";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface UpdateMediaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mediaId: string;
}

export default function UpdateMedia({
  open,
  onOpenChange,
  mediaId,
}: UpdateMediaProps) {
  const { data: media, isLoading, isError } = useGetMedia(mediaId);
  const { mutateAsync: updateMedia, isPending } = useUpdateMedia();

  const handleSubmit = async (data: TCreateMedia) => {
    if (!media) return;

    try {
      await updateMedia({
        id: media.id,
        dto: {
          ...data,
          duration: data.duration ?? undefined,
        },
      });

      toast.success("Media updated successfully");
      onOpenChange(false);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Failed to update media");
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update media</DialogTitle>

          <DialogDescription>Update media information.</DialogDescription>
        </DialogHeader>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading media...</p>
        )}

        {isError && (
          <p className="text-sm text-destructive">Failed to load media.</p>
        )}

        {media && (
          <MediaForm
            key={media.id}
            defaultValues={{
              type: media.type,
              duration: media.duration ?? undefined,
            }}
            submitLabel="Save changes"
            isPending={isPending}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
