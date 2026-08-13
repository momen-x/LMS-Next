import { useQuery } from "@tanstack/react-query";

import { resCourse } from "../repo/resCourse";
import { COURSE_KEY } from "./useGetAllCourses";

export const useGetCourseLearning = (
  courseId: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [COURSE_KEY, "learning", courseId],
    queryFn: () => resCourse.getCourseLearning(courseId),
    enabled: enabled && Boolean(courseId),
  });
};
