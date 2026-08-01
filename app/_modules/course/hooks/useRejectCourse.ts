import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateRejectMessageData } from "../dto/create-reject-message";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

interface RejectCourseVariables {
  courseId: string;
  data: CreateRejectMessageData;
}

export const useRejectCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, data }: RejectCourseVariables) =>
      resCourse.rejectCourse(courseId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COURSE_KEY],
      });
    },
  });
};