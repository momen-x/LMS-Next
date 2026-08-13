import { useMutation, useQueryClient } from "@tanstack/react-query";

import { COURSE_KEY } from "../../course/hooks/useGetAllCourses";
import type { CourseLearning } from "../../course/entities/course-learning";
import { resEnrollment } from "../repo/resEnrollment";
import type { UpdateLearningPositionInput } from "../repo/enrollment";

type UpdateLearningPositionVariables = UpdateLearningPositionInput & {
  enrollmentId: string;
};

export function useUpdateLearningPosition() {
  const queryClient = useQueryClient();

  return useMutation({
    scope: { id: "learning-position" },
    mutationFn: ({ enrollmentId, type, itemId }: UpdateLearningPositionVariables) =>
      resEnrollment.updateLearningPosition(enrollmentId, { type, itemId }),
    onSuccess: (enrollment) => {
      queryClient.setQueryData<CourseLearning>(
        [COURSE_KEY, "learning", enrollment.courseId],
        (course) =>
          course?.enrollment?.id === enrollment.id
            ? {
                ...course,
                enrollment: {
                  ...course.enrollment,
                  lastLearningType: enrollment.lastLearningType,
                  lastLearningItemId: enrollment.lastLearningItemId,
                },
              }
            : course,
      );
    },
  });
}
