"use client";

import { Clock3, Eye, FileText, Link2, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Lesson } from "../entity/lesson";

import UpdateLesson from "./update-lesson";
import LessonQuizzes from "@/app/_modules/quiz/views/lesson-quizzes";
import LessonMedia from "../../media/views/lesson-media";

interface LessonItemProps {
  lesson: Lesson;
  position: number;
}

function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  return `${seconds}s`;
}

export default function LessonCard({ lesson, position }: LessonItemProps) {
  const resourcesCount = lesson.resources?.length ?? 0;

  return (
    <article className="group rounded-lg border bg-background p-4 transition-colors hover:bg-muted/30">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
          {position}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="truncate font-medium">{lesson.title}</h4>

                {lesson.isPreview && (
                  <Badge variant="secondary">
                    <Eye className="size-3" />
                    Preview
                  </Badge>
                )}
              </div>

              {lesson.description && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {lesson.description}
                </p>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Actions for ${lesson.title}`}
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                }
              />

              <DropdownMenuContent align="end">
                <UpdateLesson lesson={lesson} />

                <DropdownMenuSeparator />
                {/* todo this button will go to delete lesson page */}
                <Button onClick={() => {}} variant="destructive">
                  Delete
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              {formatDuration(lesson.duration)}
            </span>

            <span className="flex items-center gap-1.5">
              <Link2 className="size-3.5" />
              {resourcesCount} {resourcesCount === 1 ? "resource" : "resources"}
            </span>

            <span className="flex items-center gap-1.5">
              <FileText className="size-3.5" />
              Lesson {position}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t pt-5">
        <LessonMedia lessonId={lesson.id} />
      </div>
      <div className="mt-5 border-t pt-5">
        <LessonQuizzes lessonId={lesson.id} />
      </div>
    </article>
  );
}
