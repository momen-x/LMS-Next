"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useDeleteCertificate } from "../hooks/useDeleteCertificate";

type DeleteCertificateButtonProps = {
  courseId: string;
  certificateId: string;
};

export default function DeleteCertificateButton({
  courseId,
  certificateId,
}: DeleteCertificateButtonProps) {
  const { mutate, isPending } = useDeleteCertificate();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?",
    );

    if (!confirmed) return;

    mutate(
      {
        courseId,
        certificateId,
      },
      {
        onSuccess: () => {
          toast.success("Certificate deleted successfully");
        },

        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={handleDelete}
      aria-label="Delete certificate"
    >
      <Trash2 className="size-4 text-destructive" />
    </Button>
  );
}
