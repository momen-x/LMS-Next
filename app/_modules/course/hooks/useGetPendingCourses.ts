import { useQuery } from "@tanstack/react-query";
import { COURSE_KEY } from "./useGetAllCourses";
import { resCourse } from "../repo/resCourse";

export const useGetPendingCourses = () => {
  return useQuery({
    queryKey: [COURSE_KEY, "pending"],
    queryFn: () => resCourse.getPendingCourses(),
  });
};
