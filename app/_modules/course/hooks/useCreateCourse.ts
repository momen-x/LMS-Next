import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resCourse.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_KEY] });
    },
  });
};
