import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetCourseCertificates(courseId: string) {
  return useQuery({
    queryKey: certificateQueryKeys.course(courseId),
    queryFn: () => resCertificate.getCourseCertificates(courseId),
    enabled: Boolean(courseId),
  });
}
