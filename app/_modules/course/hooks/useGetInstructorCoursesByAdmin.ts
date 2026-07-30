import { useQuery } from "@tanstack/react-query";
import { COURSE_KEY } from "./useGetAllCourses";
import { resCourse } from "../repo/resCourse";

export const useGetInstructorCoursesByAdmin = (instructorId: string) => {
  return useQuery({
    queryKey: [COURSE_KEY, "instructor", instructorId, "courses"],
    queryFn: () => resCourse.getInstructorCoursesByAdmin(instructorId),
    enabled: Boolean(instructorId),
  });
};
