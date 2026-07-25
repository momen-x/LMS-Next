"use client";

import { useDeleteLesson } from "../hooks/useDeleteLesson";
import DeleteEntityCard from "@/components/sharing/confirm-delete";

export default function DeleteLesson({ lessonId }: { lessonId: string }) {
  const { mutateAsync: deleteLesson, isPending } = useDeleteLesson();

  return (
    <DeleteEntityCard
      id={lessonId}
      title="Delete Lesson"
      impactedItems={[]}
      isPending={isPending}
      onDeleteSubmit={() => deleteLesson(lessonId)}
      successMessage="Lesson deleted successfully"
      description="Are you sure you want to delete this Lesson"
    />
  );
}
