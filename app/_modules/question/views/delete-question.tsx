"use client";

import DeleteEntityCard from "@/components/sharing/confirm-delete";
import { useDeleteQuestion } from "../hooks/useDeleteQuestion";

interface DeleteQuestionProps {
  questionId: string;
  questionBankId: string;
}

export default function DeleteQuestion({
  questionId,
  questionBankId,
}: DeleteQuestionProps) {
  const { mutateAsync: deleteQuestion, isPending } = useDeleteQuestion();

  return (
    <DeleteEntityCard
      id={questionId}
      title="Delete Question"
      impactedItems={[
        "All choices belonging to this question",
        "Student answers related to this question",
      ]}
      isPending={isPending}
      onDeleteSubmit={() =>
        deleteQuestion({
          questionId,
          questionBankId,
        })
      }
      successMessage="Question deleted successfully"
      description="Are you sure you want to delete this question? This action cannot be undone."
    />
  );
}
