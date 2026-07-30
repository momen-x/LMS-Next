import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useGetInstructorEnrollmentStats = () => {
  return useQuery({
    queryKey: [COURSE_KEY, "instructor", "enrollment-stats"],
    queryFn: () => resCourse.findCourseUserEnrollment(),
  });
};
