import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateEnrollmentInput } from "../dto/create-enrollment";
import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";

type CreateEnrollmentVariables = {
  courseId: string;
  input: CreateEnrollmentInput;
};
/**
 * @description this route allowed the admin and the instructor owner the course enrollment user without pay
 * @access UserRole : admin | instructor -> instructor owner the course 
 */
export function useCreateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, input }: CreateEnrollmentVariables) =>
      resEnrollment.createEnrollment(courseId, input),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.course(variables.courseId),
        }),
      ]);
    },
  });
}
