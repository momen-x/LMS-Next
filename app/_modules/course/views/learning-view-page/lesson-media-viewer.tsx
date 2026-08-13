"use client";

import { ExternalLink, FileText, Link2, Music2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CourseLearning } from "../../entities/course-learning";

type LearningLesson = CourseLearning["sections"][number]["lessons"][number];

type LearningMedia = LearningLesson["media"][number];

interface LessonMediaViewerProps {
  media: LearningMedia;
}

export default function LessonMediaViewer({ media }: LessonMediaViewerProps) {
  if (media.type === "video") {
    return (
      <div className="overflow-hidden rounded-2xl border bg-black">
        <video
          controls
          preload="metadata"
          src={media.url}
          className="aspect-video w-full"
        />
      </div>
    );
  }

  if (media.type === "audio") {
    return (
      <div className="rounded-2xl border bg-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Music2 className="size-5" />
          </div>

          <div>
            <p className="text-sm font-medium">Audio lesson</p>

            <p className="text-xs text-muted-foreground">
              Listen to this lesson resource.
            </p>
          </div>
        </div>

        <audio controls preload="metadata" src={media.url} className="w-full" />
      </div>
    );
  }

  if (media.type === "document") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">Course document</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Open this document in a new tab.
            </p>
          </div>
        </div>

        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button type="button" variant="outline" className="gap-2">
            Open document
            <ExternalLink className="size-4" />
          </Button>
        </a>
      </div>
    );
  }

  if (media.type === "url") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Link2 className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">External resource</p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {media.url}
            </p>
          </div>
        </div>

        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button type="button" variant="outline" className="gap-2">
            Open resource
            <ExternalLink className="size-4" />
          </Button>
        </a>
      </div>
    );
  }

  return null;
}
