import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetUserCertificates(userId: string) {
  return useQuery({
    queryKey: certificateQueryKeys.user(userId),
    queryFn: () => resCertificate.getUserCertificates(userId),
    enabled: Boolean(userId),
  });
}
