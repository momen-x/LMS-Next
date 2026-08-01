import { CreateCourseData } from "../dto/create-course";
import { CreateRejectMessageData } from "../dto/create-reject-message";
import { TSearchCoursesParams } from "../dto/search-course";
import { UpdateCourseData } from "../dto/update-course";
import { Course } from "../entity/course";
import { InstructorEnrollmentStats } from "../entity/instructor-users-enrollments";
import { CourseWithInstructor } from "../entity/pending-course";
import { SearchCoursesResponse } from "../entity/search-response-type";

export interface ICourseAPI {
  getAll: (page?: number, limit?: number) => Promise<Course[]>;
  search: (params?: TSearchCoursesParams) => Promise<SearchCoursesResponse>;
  getInstructorCourses: () => Promise<Course[]>;
  getInstructorCoursesByAdmin: (instructorId: string) => Promise<Course[]>;
  getPendingCourses: () => Promise<CourseWithInstructor[]>;
  getOne: (id: string) => Promise<Course>;
  create: (data: CreateCourseData) => Promise<Course>;
  update: (id: string, data: UpdateCourseData) => Promise<Course>;
  delete: (id: string) => Promise<Course>;
  findCourseUserEnrollment: () => Promise<InstructorEnrollmentStats>;

  submitForReview: (courseId: string) => Promise<Course>;

  approveCourse: (courseId: string) => Promise<Course>;

  rejectCourse: (
    courseId: string,
    data: CreateRejectMessageData,
  ) => Promise<Course>;
}
