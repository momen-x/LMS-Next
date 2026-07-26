import type {
  CourseLevel,
  CourseStatus,
} from "@/app/_modules/course/entity/course";

import type { Enrollment } from "./enrollment";

export type EnrollmentInstructor = {
  id: string;
  name: string;
  avatar: string | null;
};

export type EnrollmentCourse = {
  id: string;
  title: string;
  thumbnail: string | null;
  level: CourseLevel;
  status: CourseStatus;
  instructor: EnrollmentInstructor;
};

export type EnrollmentWithCourse = Enrollment & {
  course: EnrollmentCourse;
};
