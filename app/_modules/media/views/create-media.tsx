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

import { TCreateMedia } from "../dto/create-media";
import { useCreateMedia } from "../hooks/useCreateMedia";

import MediaForm from "./media-form";

interface CreateMediaProps {
  lessonId: string;
}

export default function CreateMedia({ lessonId }: CreateMediaProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createMedia, isPending } = useCreateMedia();

  const handleSubmit = async (data: TCreateMedia) => {
    try {
      await createMedia({
        lessonId,
        dto: data,
      });

      toast.success("Media uploaded successfully");

      setOpen(false);
    } catch {
      toast.error("Failed to upload media");
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
            Upload media
          </Button>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload media</DialogTitle>

          <DialogDescription>
            Upload a new media file for this lesson.
          </DialogDescription>
        </DialogHeader>

        <MediaForm
          submitLabel="Upload media"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
