import type { CreateEnrollmentInput } from "../dto/create-enrollment";
import type { GetMyEnrollmentsParams } from "../types/get-my-enrollments";
import type { Enrollment } from "../entity/enrollment";
import { EnrollmentWithCourse } from "../entity/enrollment-course";
import type { EnrollmentWithStudent } from "../entity/enrollment-student";
import { LessonCompletionResult } from "../entity/lesson-completion-result";

export type UserEnrollmentStats = {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  averageProgress: number;
};

export interface IEnrollmentAPI {
  createEnrollment(
    courseId: string,
    input: CreateEnrollmentInput,
  ): Promise<Enrollment>;

  getMyEnrollments(
    params?: GetMyEnrollmentsParams,
  ): Promise<EnrollmentWithCourse[]>;

  getCourseEnrollments(courseId: string): Promise<EnrollmentWithStudent[]>;

  getEnrollmentById(enrollmentId: string): Promise<Enrollment>;

  deleteEnrollment(enrollmentId: string): Promise<Enrollment>;
  getUserEnrollmentStats(): Promise<UserEnrollmentStats>;
  completeLesson: (
    enrollmentId: string,
    lessonId: string,
  ) => Promise<LessonCompletionResult>;
  removeLessonCompletion: (
    enrollmentId: string,
    lessonId: string,
  ) => Promise<LessonCompletionResult>;
  isUserEnrolledInCourse: (courseId: string) => Promise<boolean>;
}
