"use client";


import DeleteEntityCard from "@/components/sharing/confirm-delete";
import { useDeleteQuiz } from "../hooks/useDeleteQuiz";

interface DeleteQuizProps {
  quizId: string;
  lessonId: string;
}

export default function DeleteQuiz({
  quizId,
  lessonId,
}: DeleteQuizProps) {
  const { mutateAsync: deleteQuiz, isPending } = useDeleteQuiz();

  return (
    <DeleteEntityCard
      id={quizId}
      title="Delete Quiz"
      impactedItems={[
        "All questions inside this quiz",
        "All choices belonging to those questions",
        "All student attempts and submitted answers",
      ]}
      isPending={isPending}
      onDeleteSubmit={() =>
        deleteQuiz({
          quizId,
          lessonId,
        })
      }
      successMessage="Quiz deleted successfully"
      description="Are you sure you want to delete this quiz? This action cannot be undone."
    />
  );
}