"use client";

import { useQuery } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useGetUserEnrollmentStats() {
  return useQuery({
    queryKey: enrollmentQueryKeys.userStats(),
    queryFn: () => resEnrollment.getUserEnrollmentStats(),
  });
}
