import { CourseLevel } from "../entity/course";

export type TSearchCoursesParams = {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  level?: CourseLevel,
  language?: string;
};
