"use client";

import { useDeleteSection } from "../hooks/useDeleteSection";
import DeleteEntityCard from "@/components/sharing/confirm-delete";

export default function DeleteSection({ sectionId }: { sectionId: string }) {
  const { mutateAsync: deleteSection, isPending } = useDeleteSection();

  return (
    <DeleteEntityCard
      id={sectionId}
      title="Delete Section"
      impactedItems={["Are you sure you want to delete this section"]}
      isPending={isPending}
      onDeleteSubmit={() => deleteSection(sectionId)}
      successMessage="Section deleted successfully"
    />
  );
}
