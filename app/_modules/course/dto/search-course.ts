import { CourseLevel } from "../entity/course";

export type TSearchCoursesParams = {
  page?: number;
  limit?: number;
  category?: string;
  price?: number;
  level?: CourseLevel,
  language?: string;
};
