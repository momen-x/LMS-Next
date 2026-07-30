"use client";

import { AlertCircle, BookOpen, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useGetSectionLessons } from "../hooks/useGetSectionLessons";

import LessonCard from "./lesson-card";
import { useLessonDialog } from "../context/lesson-dialog-context";

interface SectionLessonsProps {
  sectionId: string;
}

export default function SectionLessons({ sectionId }: SectionLessonsProps) {
  const {
    data: lessons,
    isLoading,
    isError,
    refetch,
  } = useGetSectionLessons(sectionId);
  const { openCreateLesson } = useLessonDialog();

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

        <p className="font-medium">Failed to load lessons</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while loading this section.
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  const sortedLessons = [...(lessons ?? [])].sort(
    (firstLesson, secondLesson) => firstLesson.order - secondLesson.order,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center justify-between w-[65vw]">
          <div>
            <h3 className="font-medium">Lessons</h3>

            <p className="text-sm text-muted-foreground">
              {sortedLessons.length}{" "}
              {sortedLessons.length === 1 ? "lesson" : "lessons"} in this
              section
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => openCreateLesson(sectionId)}>
              {" "}
              <Plus className="w-4 h-4" />
              create lesson
            </Button>
          </div>
        </div>
      </div>

      {sortedLessons.length === 0 ? (
        <div className="rounded-lg border border-dashed px-5 py-10 text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
            <BookOpen className="size-5 text-muted-foreground" />
          </div>

          <h4 className="font-medium">No lessons yet</h4>

          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Create the first lesson to start building this section.
          </p>

          <div className="mt-4 flex justify-center">
            <Button onClick={() => openCreateLesson(sectionId)}>
              {" "}
              <Plus className="w-4 h-4" />
              create lesson
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedLessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              position={index + 1}
              onView={`/instructor-dashboard/lessons/${lesson.id}/details`}
              onDelete={(selectedLesson) => {
                console.log("Delete lesson:", selectedLesson.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
