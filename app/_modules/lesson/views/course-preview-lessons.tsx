"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock3,
  FileText,
  Link2,
  Music2,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDuration } from "@/utils/format-duration";
import { PreviewLesson } from "../repo/lesson";

interface CoursePreviewLessonsProps {
  lessons: PreviewLesson[];
}

export default function CoursePreviewLessons({
  lessons,
}: CoursePreviewLessonsProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(
    lessons[0]?.id ?? null,
  );

  const toggleLesson = (lessonId: string) => {
    setActiveLessonId((current) => (current === lessonId ? null : lessonId));
  };

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="border-b px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Play className="size-5 fill-current" />
          </div>

          <div>
            <h2 className="font-semibold">Course Preview</h2>

            <p className="mt-0.5 text-sm text-muted-foreground">
              Watch selected lessons before enrolling.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {lessons.map((lesson) => {
          const isOpen = activeLessonId === lesson.id;

          return (
            <div key={lesson.id}>
              <button
                type="button"
                onClick={() => toggleLesson(lesson.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-muted/40 sm:px-8"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Play className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {lesson.title}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock3 className="size-3.5" />

                      <span>{formatDuration(lesson.duration)}</span>

                      <span>•</span>

                      <span>
                        {lesson.media.length}{" "}
                        {lesson.media.length === 1 ? "resource" : "resources"}
                      </span>
                    </div>
                  </div>
                </div>

                {isOpen ? (
                  <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                )}
              </button>

              {isOpen && (
                <div className="border-t bg-muted/20 px-6 py-5 sm:px-8">
                  {lesson.description && (
                    <p className="mb-5 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {lesson.description}
                    </p>
                  )}

                  {lesson.media.length > 0 ? (
                    <div className="space-y-4">
                      {lesson.media.map((media) => (
                        <PreviewMedia key={media.id} media={media} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No preview media available for this lesson.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PreviewMedia({ media }: { media: PreviewLesson["media"][number] }) {
  if (media.type === "video") {
    return (
      <div className="overflow-hidden rounded-xl border bg-black">
        <video
          controls
          preload="metadata"
          className="aspect-video w-full"
          src={media.url}
        />
      </div>
    );
  }

  if (media.type === "audio") {
    return (
      <div className="rounded-xl border bg-background p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Music2 className="size-4 text-primary" />
          Audio resource
        </div>

        <audio controls preload="metadata" className="w-full" src={media.url} />
      </div>
    );
  }

  if (media.type === "document") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-background p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-4" />
          </div>

          <div>
            <p className="text-sm font-medium">Course document</p>

            <p className="text-xs text-muted-foreground">
              Open this resource in a new tab
            </p>
          </div>
        </div>

        <a href={media.url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            Open
          </Button>
        </a>
      </div>
    );
  }

  if (media.type === "url") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-background p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Link2 className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">External resource</p>

            <p className="truncate text-xs text-muted-foreground">
              {media.url}
            </p>
          </div>
        </div>

        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          Open
        </a>
      </div>
    );
  }

  return null;
}
