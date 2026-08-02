"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enrollmentQueryKeys } from "../../enrollment/hooks/enrollment-query-keys";
import { resPayment } from "../repo/resPayment";

export function useEnrollInCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => resPayment.createCheckout(courseId),

    onSuccess: async (result) => {
      if ("checkoutUrl" in result) {
        window.location.assign(result.checkoutUrl);
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.course(result.courseId),
        }),

        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.userStats(),
        }),
      ]);
    },
  });
}
