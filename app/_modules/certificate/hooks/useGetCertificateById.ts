import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetCertificateById(certificateId: string) {
  return useQuery({
    queryKey: certificateQueryKeys.userCertificateDetail(certificateId),
    queryFn: () => resCertificate.findById(certificateId),
    enabled: Boolean(certificateId),
  });
}
