import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resCourse.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_KEY] });
    },
  });
};
