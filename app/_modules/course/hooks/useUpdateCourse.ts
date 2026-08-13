import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "../hooks/useGetAllCourses";
import { UpdateCourseData } from "../dto/update-course";
import { Course } from "../entities/course";

export const useUpdateCourse = (): UseMutationResult<
  Course,
  Error,
  { data: UpdateCourseData; id: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => resCourse.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COURSE_KEY, data.id] });
    },
  });
};
