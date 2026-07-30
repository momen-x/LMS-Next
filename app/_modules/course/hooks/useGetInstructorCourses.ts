import { useQuery } from "@tanstack/react-query";
import { COURSE_KEY } from "./useGetAllCourses";
import { resCourse } from "../repo/resCourse";

export const useGetInstructorCourses = () => {
  return useQuery({
    queryKey: [COURSE_KEY, "instructor", "my-courses"],
    queryFn: () => resCourse.getInstructorCourses(),
  });
};
