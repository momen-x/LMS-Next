"use client";

import { useQuery } from "@tanstack/react-query";

import type { GetMyEnrollmentsParams } from "../types/get-my-enrollments";
import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useGetMyEnrollments(
  params?: GetMyEnrollmentsParams,
  enabled = true,
) {
  return useQuery({
    queryKey: enrollmentQueryKeys.mine(params),
    queryFn: () => resEnrollment.getMyEnrollments(params),
    enabled,
  });
}
