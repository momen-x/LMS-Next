import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetMyCertificates() {
  return useQuery({
    queryKey: certificateQueryKeys.mine(),
    queryFn: () => resCertificate.getMyCertificates(),
  });
}
