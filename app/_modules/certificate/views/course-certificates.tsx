"use client";

import { Award } from "lucide-react";

import {getErrorMessage} from "@/utils/get-axios-error-message";

import { useGetCourseCertificates } from "../hooks/useGetCourseCertificates";

import DeleteCertificateButton from "./delete-certificate-button";

type CourseCertificatesProps = {
  courseId: string;
};

export default function CourseCertificates({
  courseId,
}: CourseCertificatesProps) {
  const {
    data: certificates,
    isPending,
    isError,
    error,
  } = useGetCourseCertificates(courseId);

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5">
        <p className="font-medium text-destructive">
          Failed to load course certificates
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  if (!certificates?.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <Award className="size-7 text-muted-foreground" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No certificates issued
        </h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Certificates issued to students in this course will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="grid grid-cols-[1.2fr_1.4fr_1fr_auto] gap-4 border-b bg-muted/40 px-4 py-3 text-sm font-medium">
        <span>Student ID</span>
        <span>Certificate Number</span>
        <span>Issue Date</span>
        <span className="sr-only">Actions</span>
      </div>

      {certificates.map((certificate) => (
        <div
          key={certificate.id}
          className="grid grid-cols-[1.2fr_1.4fr_1fr_auto] items-center gap-4 border-b px-4 py-3 last:border-b-0"
        >
          <span className="truncate text-sm">
            {certificate.studentId}
          </span>

          <span className="truncate text-sm font-medium">
            {certificate.certificateNumber}
          </span>

          <span className="text-sm text-muted-foreground">
            {new Intl.DateTimeFormat("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(certificate.issueDate))}
          </span>

          <DeleteCertificateButton
            courseId={courseId}
            certificateId={certificate.id}
          />
        </div>
      ))}
    </div>
  );
}