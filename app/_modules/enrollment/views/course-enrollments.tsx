"use client";

import { AlertCircle, Users } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCourseEnrollments } from "../hooks/useGetCourseEnrollments";

import CreateEnrollmentForm from "./create-enrollment-form";
import EnrollmentListItem from "./enrollment-list-item";

type CourseEnrollmentsProps = {
  courseId: string;
};

export default function CourseEnrollments({
  courseId,
}: CourseEnrollmentsProps) {
  const {
    data: enrollments,
    isPending,
    isError,
    error,
  } = useGetCourseEnrollments(courseId);



  return (
    <section className="space-y-6">
      <CreateEnrollmentForm courseId={courseId} />

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Course Enrollments
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage users enrolled in this course.
          </p>
        </div>

        {isPending && <CourseEnrollmentsSkeleton />}

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />

            <AlertTitle>Unable to load enrollments</AlertTitle>

            <AlertDescription>
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
        )}

        {!isPending && !isError && !enrollments?.length && (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Users className="size-8 text-muted-foreground" />
            </div>

            <h3 className="font-semibold">No enrollments yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              No users are currently enrolled in this course.
            </p>
          </div>
        )}

        {!isPending && !isError && Boolean(enrollments?.length) && (
          <div className="space-y-3">
            {enrollments?.map((enrollment) => (
              <EnrollmentListItem key={enrollment.id} enrollment={enrollment} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CourseEnrollmentsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-4 rounded-xl border p-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  );
}
