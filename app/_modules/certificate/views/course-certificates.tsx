"use client";

import { Award, ExternalLink, UserRound } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import QueryErrorState from "@/components/sharing/query-error-state";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/get-axios-error-message";

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
    isFetching,
    refetch,
  } = useGetCourseCertificates(courseId);

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load course certificates"
        description={
          getErrorMessage(error) ??
          "Something went wrong while loading the certificates."
        }
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (!certificates?.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <Award className="size-7 text-muted-foreground" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">No certificates issued</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Certificates issued to students in this course will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Course Certificates</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {certificates.length}{" "}
          {certificates.length === 1 ? "certificate" : "certificates"} issued
          for this course.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="hidden grid-cols-[1.4fr_1.5fr_1fr_auto] gap-4 border-b bg-muted/40 px-5 py-3 text-sm font-medium md:grid">
          <span>Student</span>
          <span>Certificate Number</span>
          <span>Issue Date</span>
          <span>Actions</span>
        </div>

        <div className="divide-y">
          {certificates.map((certificate) => {
            const studentName = certificate.student?.name ?? "Student";

            const issueDate = new Intl.DateTimeFormat("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(certificate.issueDate));

            const publicCertificateUrl = `/certificates/verify/${encodeURIComponent(
              certificate.certificateNumber,
            )}`;

            return (
              <div
                key={certificate.id}
                className="grid gap-4 px-5 py-4 md:grid-cols-[1.4fr_1.5fr_1fr_auto] md:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-9 border">
                    <AvatarImage
                      src={certificate.student?.avatar ?? undefined}
                      alt={studentName}
                    />

                    <AvatarFallback>
                      {studentName[0]?.toUpperCase() ?? (
                        <UserRound className="size-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {studentName}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {certificate.studentId}
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-muted-foreground md:hidden">
                    Certificate Number
                  </p>

                  <p
                    className="truncate text-sm font-medium"
                    title={certificate.certificateNumber}
                  >
                    {certificate.certificateNumber}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs text-muted-foreground md:hidden">
                    Issue Date
                  </p>

                  <p className="text-sm text-muted-foreground">{issueDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={publicCertificateUrl}
                    target="_blank"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "sm",
                      }),
                      "gap-2",
                    )}
                  >
                    <ExternalLink className="size-4" />
                    View
                  </Link>

                  <DeleteCertificateButton
                    courseId={courseId}
                    certificateId={certificate.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
