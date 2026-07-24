import { useQuery } from "@tanstack/react-query";
import { resCourse } from "../repo/resCourse";
import { TSearchCoursesParams } from "../dto/search-course";
import { COURSE_KEY } from "./useGetAllCourses";

export const useSearchCourses = ({
  page = 1,
  limit = 10,
  category,
  price,
  level,
  language,
}: TSearchCoursesParams = {}) => {
  return useQuery({
    queryKey: [
      COURSE_KEY,
      page,
      limit,
      category,
      price,
      level,
      language,
    ],
    queryFn: () =>
      resCourse.search({ page, limit, category, price, level, language }),
  });
};
