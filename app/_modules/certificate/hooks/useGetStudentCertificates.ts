import { useQuery } from "@tanstack/react-query";

import { resCertificate } from "../repo/resCertificate";
import { certificateQueryKeys } from "./certificate-query-keys";

export function useGetStudentCertificates(courseId: string, studentId: string) {
  return useQuery({
    queryKey: certificateQueryKeys.student(courseId, studentId),
    queryFn: () => resCertificate.getStudentCertificates(courseId, studentId),
    enabled: Boolean(courseId && studentId),
  });
}
