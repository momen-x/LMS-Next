"use client";

import { useGetInstructorCoursesByAdmin } from "../hooks/useGetInstructorCoursesByAdmin";
import { CoursesTableView } from "./course-table-view";

export default function AdminInstructorCoursesTable({
  instructorId,
}: {
  instructorId: string;
}) {
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetInstructorCoursesByAdmin(instructorId);

  if (isError) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-sm text-muted-foreground">
        Failed to load this instructor&apos;s courses.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-background text-foreground min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Instructor Courses
        </h1>
        <p className="text-sm text-muted-foreground">
          All courses created by this instructor.
        </p>
      </div>

      <CoursesTableView
        courses={courses ?? []}
        isLoading={isLoading}
        showInstructorColumn={false}
        emptyMessage="This instructor hasn't created any courses yet."
      />
    </div>
  );
}
