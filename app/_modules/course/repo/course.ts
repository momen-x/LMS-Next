import { CreateCourseData } from "../dto/create-course";
import { TSearchCoursesParams } from "../dto/search-course";
import { UpdateCourseData } from "../dto/update-course";
import { Course } from "../entity/course";
import { SearchCoursesResponse } from "../entity/search-response-type";

export interface ICourseAPI {
  getAll: (page?: number, limit?: number) => Promise<Course[]>;
  search: (params?: TSearchCoursesParams) => Promise<SearchCoursesResponse>;
  getInstructorCourses: () => Promise<Course[]>;
  getInstructorCoursesByAdmin: (instructorId: string) => Promise<Course[]>;
  getOne: (id: string) => Promise<Course>;
  create: (data: CreateCourseData) => Promise<Course>;
  update: (id: string, data: UpdateCourseData) => Promise<Course>;
  delete: (id: string) => Promise<Course>;
}
