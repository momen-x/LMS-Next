import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: [COURSE_KEY, "detail", id],
    queryFn: () => resCourse.getOne(id),
    enabled: !!id,
  });
};
