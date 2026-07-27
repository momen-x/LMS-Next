"use client";

import { useDeleteUserByAdmin } from "../hooks/useDeleteUserByAdmin";
import DeleteEntityCard from "@/components/sharing/confirm-delete";

export default function DeleteUserByAdmin({ userId }: { userId: string }) {
  const { mutateAsync: deleteUser, isPending } = useDeleteUserByAdmin();

  return (
    <DeleteEntityCard
      id={userId}
      title={`Delete User with ID ${userId}`}
      impactedItems={[""]}
      isPending={isPending}
      onDeleteSubmit={() => deleteUser({id: userId})}
      successMessage="User deleted successfully"
      description="Are you sure you want to delete this user"
    />
  );
}
