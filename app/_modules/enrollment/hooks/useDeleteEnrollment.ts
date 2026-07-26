"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

export function useDeleteEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enrollmentId: string) =>
      resEnrollment.deleteEnrollment(enrollmentId),

    onSuccess: async (_, enrollmentId) => {
      queryClient.removeQueries({
        queryKey: enrollmentQueryKeys.detail(enrollmentId),
      });

      await queryClient.invalidateQueries({
        queryKey: enrollmentQueryKeys.all,
      });
    },
  });
}
