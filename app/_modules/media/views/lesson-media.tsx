"use client";

import { AlertCircle, Loader2, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetLessonMedia } from "../hooks/useGetLessonMedia";

import CreateMedia from "./create-media";
import MediaCard from "./media-card";

interface LessonMediaProps {
  lessonId: string;
}

export default function LessonMedia({ lessonId }: LessonMediaProps) {
  const {
    data: media,
    isLoading,
    isError,
    refetch,
  } = useGetLessonMedia(lessonId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed py-10">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-5 text-center">
        <AlertCircle className="mx-auto mb-2 size-5 text-destructive" />

        <p className="font-medium">Failed to load media</p>

        <Button
          className="mt-4"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Lesson Media</h3>

          <p className="text-sm text-muted-foreground">
            {media?.length ?? 0} {(media?.length ?? 0) === 1 ? "file" : "files"}
          </p>
        </div>

        <CreateMedia lessonId={lessonId} />
      </div>

      {!media?.length ? (
        <div className="rounded-lg border border-dashed py-10 text-center">
          <FolderOpen className="mx-auto mb-3 size-6 text-muted-foreground" />

          <h4 className="font-medium">No media uploaded</h4>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload the first media file for this lesson.
          </p>

          <div className="mt-4 flex justify-center">
            <CreateMedia lessonId={lessonId} />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {media.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      )}
    </div>
  );
}
