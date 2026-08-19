import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useGetHighRatingCourses = (count: number = 1) => {
  return useQuery({
    queryKey: [COURSE_KEY, "high-rating", count],
    queryFn: () => resCourse.getHighRatingCourses(count),
  });
};
