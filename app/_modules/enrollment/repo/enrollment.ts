import type { CreateEnrollmentInput } from "../dto/create-enrollment";
import type { GetMyEnrollmentsParams } from "../types/get-my-enrollments";
import type { Enrollment } from "../entities/enrollment";
import { EnrollmentWithCourse } from "../entities/enrollment-course";
import type { EnrollmentWithStudent } from "../entities/enrollment-student";
import { LessonCompletionResult } from "../entities/lesson-completion-result";

export type UserEnrollmentStats = {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  averageProgress: number;
};

export type UpdateLearningPositionInput = {
  type: "lesson" | "quiz";
  itemId: string;
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
  updateLearningPosition: (
    enrollmentId: string,
    input: UpdateLearningPositionInput,
  ) => Promise<Enrollment>;
  isUserEnrolledInCourse: (courseId: string) => Promise<boolean>;
}
