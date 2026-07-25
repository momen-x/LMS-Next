"use client";


import DeleteEntityCard from "@/components/sharing/confirm-delete";
import { useDeleteChoice } from "../hooks/useDeleteChoice";

interface DeleteChoiceProps {
  choiceId: string;
  questionId: string;
}

export default function DeleteChoice({
  choiceId,
  questionId,
}: DeleteChoiceProps) {
  const { mutateAsync: deleteChoice, isPending } = useDeleteChoice();

  return (
    <DeleteEntityCard
      id={choiceId}
      title="Delete Choice"
      impactedItems={["Student answers that reference this choice"]}
      isPending={isPending}
      onDeleteSubmit={() =>
        deleteChoice({
          choiceId,
          questionId,
        })
      }
      successMessage="Choice deleted successfully"
      description="Are you sure you want to delete this choice? This action cannot be undone."
    />
  );
}
