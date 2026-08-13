"use client";

import { useGetMyCertificates } from "../hooks/useGetMyCertificates";

import CertificateInformation from "./certificate-information";
import CertificateStats from "./certificate-stats";
import UserCertificates from "./user-certificates";

export default function CertificatesView() {
  const {
    data: certificates = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useGetMyCertificates();
  

  return (
    <div className="container mx-auto space-y-8 p-4 md:p-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Certificates
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View the certificates you have earned by completing courses.
        </p>
      </header>

      {!isPending && !isError && (
        <CertificateStats certificates={certificates} />
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <UserCertificates
          certificates={certificates}
          isPending={isPending}
          isError={isError}
          isFetching={isFetching}
          onRetry={() => refetch()}
          emptyDescription="Complete an eligible course to earn your first certificate."
        />

        <CertificateInformation />
      </div>
    </div>
  );
}