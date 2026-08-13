"use client";

import { useQuery } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useGetMyEnrollmentByCourse(
  courseId: string,
  enabled = true,
) {
  return useQuery({
    queryKey: enrollmentQueryKeys.mineByCourse(courseId),
    queryFn: () => resEnrollment.myEnrollmentByCourse(courseId),
    enabled: enabled && Boolean(courseId),
  });
}
