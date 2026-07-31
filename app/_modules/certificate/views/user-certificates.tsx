"use client";

import { useState } from "react";
import { Award } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";

import { Certificate } from "../entity/certificate";
import CertificateCard from "./certificate-card";
import CertificatePreviewDialog from "./certificate-preview-dialog";

interface UserCertificatesProps {
  certificates: Certificate[];
  isPending: boolean;
  isError: boolean;
  isFetching?: boolean;
  onRetry?: () => void;
  title?: string;
  description?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function UserCertificates({
  certificates,
  isPending,
  isError,
  isFetching = false,
  onRetry,
  title = "Earned Certificates",
  description,
  emptyTitle = "No certificates earned yet",
  emptyDescription = "This user has not earned any certificates yet.",
}: UserCertificatesProps) {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <QueryErrorState
          title="Failed to load certificates"
          description="Something went wrong while loading the certificates."
          isRetrying={isFetching}
          onRetry={onRetry}
        />
      ) : certificates.length === 0 ? (
        <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Award className="size-6 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-semibold">{emptyTitle}</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {emptyDescription}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onPreview={setSelectedCertificate}
            />
          ))}
        </div>
      )}

      <CertificatePreviewDialog
        certificate={selectedCertificate}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCertificate(null);
          }
        }}
      />
    </section>
  );
}
