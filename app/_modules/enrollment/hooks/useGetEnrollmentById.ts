"use client";

import { useQuery } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useGetEnrollmentById(enrollmentId: string, enabled = true) {
  return useQuery({
    queryKey: enrollmentQueryKeys.detail(enrollmentId),
    queryFn: () => resEnrollment.getEnrollmentById(enrollmentId),
    enabled: enabled && Boolean(enrollmentId),
  });
}
