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

import { Media } from "../entity/media";
import { TUpdateMedia } from "../dto/update-media";
import { useUpdateMedia } from "../hooks/useUpdateMedia";

import MediaForm from "./media-form";

interface UpdateMediaProps {
  media: Media;
}

export default function UpdateMedia({ media }: UpdateMediaProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync: updateMedia, isPending } = useUpdateMedia();

  const handleSubmit = async (data: TUpdateMedia) => {
    try {
      await updateMedia({
        id: media.id,
        dto: data,
      });

      toast.success("Media updated successfully");

      setOpen(false);
    } catch {
      toast.error("Failed to update media");
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
            Edit media
          </DropdownMenuItem>
        }
      />

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update media</DialogTitle>

          <DialogDescription>Update media information.</DialogDescription>
        </DialogHeader>

        <MediaForm
          defaultValues={{
            type: media.type,
            duration: media.duration ?? undefined,
          }}
          submitLabel="Save changes"
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
