"use client";

import { useQuery } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useIsUserEnrolledInCourse(
  courseId: string,
  enabled = true,
) {
  return useQuery({
    queryKey: enrollmentQueryKeys.isUserEnrolled(courseId),
    queryFn: () => resEnrollment.isUserEnrolledInCourse(courseId),
    enabled: enabled && Boolean(courseId),
  });
}
