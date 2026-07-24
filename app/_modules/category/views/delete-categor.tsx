"use client";

import { useDeleteCategory } from "../hooks/useDeleteCategory";
import DeleteEntityCard from "@/components/sharing/confirm-delete";

export default function DeleteCategory({ categoryId }: { categoryId: string }) {
  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();

  return (
    <DeleteEntityCard
      id={categoryId}
      title="Delete Category"
      impactedItems={["If there is any training course associated with this category, the deletion process is likely to fail."]}
      isPending={isPending}
      onDeleteSubmit={() => deleteCategory(categoryId)}
      successMessage="Category deleted successfully"
      description="Are you sure you want to delete this category"
    />
  );
}
