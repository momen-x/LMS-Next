import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";

export const COURSE_KEY = "courses";
export const useGetAllCourses = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: [COURSE_KEY, "all", page, limit],
    queryFn: () => resCourse.getAll(page, limit),
  });
};
