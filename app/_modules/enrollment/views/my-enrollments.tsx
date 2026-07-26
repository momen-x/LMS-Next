"use client";

import { AlertCircle, BookOpen } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetMyEnrollments } from "../hooks/useGetMyEnrollments";
import EnrollmentCard from "./enrollment-card";

type MyEnrollmentsProps = {
  courseId?: string;
  onOpenCourse?: (courseId: string) => void;
};

export default function MyEnrollments({
  courseId,
  onOpenCourse,
}: MyEnrollmentsProps) {
  const {
    data: enrollments,
    isPending,
    isError,
    error,
  } = useGetMyEnrollments(courseId ? { courseId } : undefined);

  if (isPending) {
    return <MyEnrollmentsSkeleton />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />

        <AlertTitle>Unable to load enrollments</AlertTitle>

        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!enrollments?.length) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <BookOpen className="size-8 text-muted-foreground" />
        </div>

        <h2 className="text-lg font-semibold">No enrolled courses</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          You are not currently enrolled in any courses.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">My Courses</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Continue learning and track your course progress.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {enrollments.map((enrollment) => (
          <EnrollmentCard
            key={enrollment.id}
            enrollment={enrollment}
            onOpenCourse={onOpenCourse}
          />
        ))}
      </div>
    </section>
  );
}

function MyEnrollmentsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border">
            <Skeleton className="aspect-video w-full rounded-none" />

            <div className="space-y-4 p-5">
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
