import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetCertificateByNumber(
  courseId: string,
  certificateNumber: string,
) {
  return useQuery({
    queryKey: certificateQueryKeys.byNumber(courseId, certificateNumber),
    queryFn: () =>
      resCertificate.getCertificateByNumber(courseId, certificateNumber),
    enabled: Boolean(courseId && certificateNumber.trim()),
  });
}
