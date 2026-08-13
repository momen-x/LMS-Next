import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resEnrollment } from "../repo/resEnrollment";
import { enrollmentQueryKeys } from "./enrollment-query-keys";
import { COURSE_KEY } from "../../course/hooks/useGetAllCourses";

type CompleteLessonVariables = {
  enrollmentId: string;
  lessonId: string;
};

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ enrollmentId, lessonId }: CompleteLessonVariables) =>
      resEnrollment.completeLesson(enrollmentId, lessonId),

    onSuccess: async (result, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.detail(variables.enrollmentId),
        }),

        queryClient.invalidateQueries({
          queryKey: [...enrollmentQueryKeys.all, "mine"],
        }),

        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.userStats(),
        }),

        queryClient.invalidateQueries({
          queryKey: enrollmentQueryKeys.course(result.enrollment.courseId),
        }),

        queryClient.invalidateQueries({
          queryKey: [COURSE_KEY, "learning", result.enrollment.courseId],
        }),
      ]);
    },
  });
}
