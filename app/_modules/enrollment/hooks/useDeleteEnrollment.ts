"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

/**
 * @description this route allowed the admin and the instructor owner the course delete enrollment user
 * @access UserRole : admin | instructor -> instructor owner the course 
 */
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
