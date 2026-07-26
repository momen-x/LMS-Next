import { CourseLevel, CourseStatus } from "../../course/entity/course";
import type { Enrollment } from "./enrollment";

export type EnrollmentCourseInstructor = {
  id: string;
  name: string;
  avatar: string | null;
};

export type EnrollmentCourse = {
  id: string;
  title: string;
  thumbnail: string;
  level: CourseLevel;
  status: CourseStatus;
  instructor?: EnrollmentCourseInstructor;
};

export type EnrollmentWithCourse = Enrollment & {
  course: EnrollmentCourse;
};
