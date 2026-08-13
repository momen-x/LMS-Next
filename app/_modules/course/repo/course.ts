import { CreateCourseData } from "../dto/create-course";
import { CreateRejectMessageData } from "../dto/create-reject-message";
import { TSearchCoursesParams } from "../dto/search-course";
import { UpdateCourseData } from "../dto/update-course";
import { Course } from "../entities/course";
import { CourseLearning } from "../entities/course-learning";
import { InstructorEnrollmentStats } from "../entities/instructor-users-enrollments";
import { CourseWithInstructor } from "../entities/pending-course";
import { SearchCoursesResponse } from "../entities/search-response-type";

export interface ICourseAPI {
  getAll: (page?: number, limit?: number) => Promise<Course[]>;
  search: (params?: TSearchCoursesParams) => Promise<SearchCoursesResponse>;
  getInstructorCourses: () => Promise<Course[]>;
  getInstructorCoursesByAdmin: (instructorId: string) => Promise<Course[]>;
  getPendingCourses: () => Promise<CourseWithInstructor[]>;
  getOne: (id: string) => Promise<Course>;
  getCourseLearning: (id: string) => Promise<CourseLearning>;
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
  getHighRatingCourses: (count?: number) => Promise<Course[]>;
}
