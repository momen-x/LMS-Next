import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";

export const COURSE_KEY = "course";
export const useGetAllCourses = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: [COURSE_KEY],
    queryFn: () => resCourse.getAll(page, limit),
  });
};
