import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useGetCourse = (id: string, page?: number, limit?: number) => {
  return useQuery({
    queryKey: [COURSE_KEY, "list", page, limit],
    queryFn: () => resCourse.getOne(id),
    enabled: !!id,
  });
};
