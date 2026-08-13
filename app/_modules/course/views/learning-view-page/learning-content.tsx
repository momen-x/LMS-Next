"use client";

import { PlayCircle } from "lucide-react";

import { CourseLearning } from "../../entities/course-learning";
import LessonMediaViewer from "./lesson-media-viewer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type LearningLesson = CourseLearning["sections"][number]["lessons"][number];

interface LearningContentProps {
  lesson: LearningLesson | null;
}

export default function LearningContent({ lesson }: LearningContentProps) {
  if (!lesson) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
        <div>
          <PlayCircle className="mx-auto size-10 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold">No lesson available</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            This course does not have any lessons yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 lg:px-10">
      <div className="w-full flex justify-end">
        <Link href={"/student-dashboard/courses"}>
          <Button variant={"default"}>Back to Learning</Button>
        </Link>
      </div>
      <header className="border-b pb-6">
        <p className="text-sm font-medium text-primary">Lesson</p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {lesson.title}
        </h1>

        {lesson.description && (
          <p className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {lesson.description}
          </p>
        )}
      </header>

      <div className="mt-8 space-y-6">
        {lesson.media.length > 0 ? (
          lesson.media.map((media) => (
            <LessonMediaViewer key={media.id} media={media} />
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No media available for this lesson.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
