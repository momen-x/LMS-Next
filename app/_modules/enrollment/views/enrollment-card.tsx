"use client";

import Image from "next/image";
import { BookOpen, CheckCircle2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import type { EnrollmentWithCourse } from "../entity/enrollment-course";

type EnrollmentCardProps = {
  enrollment: EnrollmentWithCourse;
  onOpenCourse?: (courseId: string) => void;
};

export default function EnrollmentCard({
  enrollment,
  onOpenCourse,
}: EnrollmentCardProps) {
  const { course, progress, completed } = enrollment;

  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video w-full bg-muted">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="size-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 font-semibold leading-6">
              {course.title}
            </h3>

            {completed && (
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-green-600"
                aria-label="Course completed"
              />
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserRound className="size-4" />

            <span className="truncate">{course.instructor?.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-muted px-3 py-1 capitalize">
            {course.level}
          </span>

          <span className="rounded-full bg-muted px-3 py-1 capitalize">
            {course.status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>

            <span className="font-medium">{normalizedProgress}%</span>
          </div>

          <Progress value={normalizedProgress} />
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          type="button"
          className="w-full"
          onClick={() => onOpenCourse?.(course.id)}
          disabled={!onOpenCourse}
        >
          {completed ? "Review Course" : "Continue Learning"}
        </Button>
      </CardFooter>
    </Card>
  );
}
