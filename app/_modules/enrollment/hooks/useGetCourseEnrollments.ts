"use client";

import { useQuery } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useGetCourseEnrollments(courseId: string, enabled = true) {
  return useQuery({
    queryKey: enrollmentQueryKeys.course(courseId),
    queryFn: () => resEnrollment.getCourseEnrollments(courseId),
    enabled: enabled && Boolean(courseId),
  });
}
