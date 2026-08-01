import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useApproveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => resCourse.approveCourse(courseId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COURSE_KEY],
      });
    },
  });
};
