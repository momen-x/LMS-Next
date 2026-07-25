"use client";

import DeleteEntityCard from "@/components/sharing/confirm-delete";

import { useDeleteMedia } from "../hooks/useDeleteMedia";

interface DeleteMediaProps {
  mediaId: string;
}

export default function DeleteMedia({ mediaId }: DeleteMediaProps) {
  const { mutateAsync: deleteMedia, isPending } = useDeleteMedia();

  return (
    <DeleteEntityCard
      id={mediaId}
      title="Delete Media"
      impactedItems={[]}
      isPending={isPending}
      onDeleteSubmit={() => deleteMedia(mediaId)}
      successMessage="Media deleted successfully"
      description="Are you sure you want to delete this media?"
    />
  );
}
