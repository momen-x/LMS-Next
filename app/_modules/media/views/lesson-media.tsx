"use client";

import { FolderOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetLessonMedia } from "../hooks/useGetLessonMedia";
import { useMediaDialog } from "../context/media-dialog-context";

import MediaCard from "./media-card";
import BackBtn from "@/components/sharing/back-btn";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";

interface LessonMediaProps {
  lessonId: string;
}

export default function LessonMedia({ lessonId }: LessonMediaProps) {
  const {
    data: media,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetLessonMedia(lessonId);

  const { openCreateMedia } = useMediaDialog();

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
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">Lesson Media</h3>

          <p className="text-sm text-muted-foreground">
            {media?.length ?? 0} {(media?.length ?? 0) === 1 ? "file" : "files"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BackBtn />
          <Button type="button" onClick={() => openCreateMedia(lessonId)}>
            <Plus className="size-4" />
            Upload media
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
        <div className="space-y-3">
          {media.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              onView={item.url}
              onDelete={(selectedMedia) => {
                console.log("Delete media:", selectedMedia.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
