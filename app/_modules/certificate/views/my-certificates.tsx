"use client";

import { Award } from "lucide-react";

import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useGetMyCertificates } from "../hooks/useGetMyCertificates";

import CertificateCard from "./certificate-card";

export default function MyCertificates() {
  const {
    data: certificates,
    isPending,
    isError,
    error,
  } = useGetMyCertificates();
  if (isPending) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-64 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5">
        <p className="font-medium text-destructive">
          Failed to load certificates
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  if (!certificates?.length) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <Award className="size-7 text-muted-foreground" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">No certificates yet</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Your certificates will appear here after you complete eligible
          courses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          onPreviewLink={`/student-dashboard/certificates/${certificate.id}`}
        />
      ))}
    </div>
  );
}
