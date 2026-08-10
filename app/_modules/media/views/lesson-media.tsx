"use client";

import { FolderOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetLessonMedia } from "../hooks/useGetLessonMedia";
import { useMediaDialog } from "../context/media-dialog-context";

import MediaCard from "./media-card";
import BackBtn from "@/components/sharing/back-btn";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";
import { useDeleteMedia } from "../hooks/useDeleteMedia";
import { useDeleteDialog } from "@/components/sharing/delete-dialog-context";

interface LessonMediaProps {
  lessonId: string;
  embedded?: boolean;
}

export default function LessonMedia({
  lessonId,
  embedded = false,
}: LessonMediaProps) {
  const {
    data: media,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetLessonMedia(lessonId);

  const { openCreateMedia } = useMediaDialog();
  const { mutateAsync: deleteMedia } = useDeleteMedia();
  const { openDeleteDialog } = useDeleteDialog();

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load media"
        description="We couldn’t load the media for this lesson."
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className={embedded ? "min-w-0 space-y-5 p-5 md:p-6" : "space-y-4"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className={embedded ? "text-lg font-semibold" : "font-medium"}>
            Lesson Media
          </h3>

          <p className="text-sm text-muted-foreground">
            {media?.length ?? 0} {(media?.length ?? 0) === 1 ? "file" : "files"}
            {embedded ? " attached to this lesson" : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {!embedded && <BackBtn />}
          <Button
            type="button"
            size={embedded ? "sm" : "default"}
            onClick={() => openCreateMedia(lessonId)}
          >
            <Plus className="size-4" />
            Add media
          </Button>
        </div>
      </div>

      {!media?.length ? (
        <div className="rounded-lg border border-dashed py-10 text-center">
          <FolderOpen className="mx-auto mb-3 size-6 text-muted-foreground" />

          <h4 className="font-medium">No media uploaded</h4>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload the first media file for this lesson.
          </p>

          <Button
            type="button"
            className="mt-4"
            onClick={() => openCreateMedia(lessonId)}
          >
            <Plus className="size-4" />
            Upload media
          </Button>
        </div>
      ) : (
        <div className="grid min-w-0 gap-3 lg:grid-cols-2">
          {media.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              onView={item.url}
              onDelete={(selectedMedia) => {
                openDeleteDialog({
                  title: "Delete media?",
                  itemName: "this media item",
                  description: "Are you sure you want to delete this media item? This action cannot be undone.",
                  successMessage: "Media deleted successfully",
                  onConfirm: () => deleteMedia(selectedMedia.id),
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
