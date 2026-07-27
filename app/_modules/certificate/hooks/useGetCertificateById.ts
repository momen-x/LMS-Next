import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetCertificateById(courseId: string, certificateId: string) {
  return useQuery({
    queryKey: certificateQueryKeys.detail(courseId, certificateId),
    queryFn: () => resCertificate.getCertificateById(courseId, certificateId),
    enabled: Boolean(courseId && certificateId),
  });
}
