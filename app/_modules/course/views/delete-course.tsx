"use client";

import { useDeleteCourse } from "../hooks/useDeleteCourse";
import DeleteEntityCard from "@/components/sharing/confirm-delete";

export default function DeleteCourse({ courseId }: { courseId: string }) {
  const { mutateAsync: deleteCourse, isPending } = useDeleteCourse();

  return (
    <DeleteEntityCard
      id={courseId}
      title="Delete Course"
      impactedItems={["All lessons and quizzes associated with this course"]}
      isPending={isPending}
      onDeleteSubmit={() => deleteCourse(courseId)}
      successMessage="Course deleted successfully"
      description="Are you sure you want to delete this course"
    />
  );
}
