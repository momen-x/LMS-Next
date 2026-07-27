"use client";

import { Award } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useCreateCertificate } from "../hooks/useCreateCertificate";

type IssueCertificateButtonProps = {
  courseId: string;
  studentId: string;
};

export default function IssueCertificateButton({
  courseId,
  studentId,
}: IssueCertificateButtonProps) {
  const { mutate, isPending } = useCreateCertificate();

  function handleIssueCertificate() {
    mutate(
      {
        courseId,
        studentId,
      },
      {
        onSuccess: () => {
          toast.success("Certificate issued successfully");
        },

        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  }

  return (
    <Button type="button" disabled={isPending} onClick={handleIssueCertificate}>
      <Award className="size-4" />

      {isPending ? "Issuing..." : "Issue Certificate"}
    </Button>
  );
}
