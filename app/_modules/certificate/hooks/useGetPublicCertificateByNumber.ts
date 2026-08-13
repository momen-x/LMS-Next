import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetPublicCertificateByNumber(certificateNumber: string) {
  const normalizedCertificateNumber = certificateNumber.trim();

  return useQuery({
    queryKey: certificateQueryKeys.publicByNumber(normalizedCertificateNumber),
    queryFn: () =>
      resCertificate.findPublicByCertificateNum(normalizedCertificateNumber),
    enabled: Boolean(normalizedCertificateNumber),
  });
}
