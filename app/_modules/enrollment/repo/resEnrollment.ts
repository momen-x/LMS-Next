import { CreateEnrollmentInput } from "../dto/create-enrollment";
import { Enrollment } from "../entities/enrollment";
import { EnrollmentWithCourse } from "../entities/enrollment-course";
import type { EnrollmentWithStudent } from "../entities/enrollment-student";
import { LessonCompletionResult } from "../entities/lesson-completion-result";
import { GetMyEnrollmentsParams } from "../types/get-my-enrollments";
import {
  IEnrollmentAPI,
  UpdateLearningPositionInput,
  UserEnrollmentStats,
} from "./enrollment";
import { api } from "@/utils/axiosInstance";

const BASE_URL = "/api/enrollments";

export const resEnrollment: IEnrollmentAPI = {
  createEnrollment: async function (
    courseId: string,
    input: CreateEnrollmentInput,
  ): Promise<Enrollment> {
    const res = await api.post<Enrollment>(
      `/api/courses/${courseId}/enrollments`,
      input,
    );
    return res.data;
  },
  getMyEnrollments: async function (
    params?: GetMyEnrollmentsParams,
  ): Promise<EnrollmentWithCourse[]> {
    const res = await api.get<EnrollmentWithCourse[]>(`${BASE_URL}/me`, {
      params,
    });
    return res.data;
  },
  getCourseEnrollments: async function (
    courseId: string,
  ): Promise<EnrollmentWithStudent[]> {
    const res = await api.get<EnrollmentWithStudent[]>(
      `/api/courses/${courseId}/enrollments`,
    );
    return res.data;
  },
  getEnrollmentById: async function (
    enrollmentId: string,
  ): Promise<Enrollment> {
    const res = await api.get<Enrollment>(`${BASE_URL}/${enrollmentId}`);
    return res.data;
  },
  deleteEnrollment: async function (enrollmentId: string): Promise<Enrollment> {
    const res = await api.delete<Enrollment>(`${BASE_URL}/${enrollmentId}`);
    return res.data;
  },
  getUserEnrollmentStats: async function (): Promise<UserEnrollmentStats> {
    const res = await api.get<UserEnrollmentStats>(`${BASE_URL}/me/stats`);
    return res.data;
  },

  completeLesson: async function (
    enrollmentId: string,
    lessonId: string,
  ): Promise<LessonCompletionResult> {
    const response = await api.post<LessonCompletionResult>(
      `${BASE_URL}/${enrollmentId}/lessons/${lessonId}/complete`,
    );

    return response.data;
  },

  removeLessonCompletion: async function (
    enrollmentId: string,
    lessonId: string,
  ): Promise<LessonCompletionResult> {
    const response = await api.delete<LessonCompletionResult>(
      `${BASE_URL}/${enrollmentId}/lessons/${lessonId}/complete`,
    );

    return response.data;
  },
  updateLearningPosition: async function (
    enrollmentId: string,
    input: UpdateLearningPositionInput,
  ): Promise<Enrollment> {
    const response = await api.patch<Enrollment>(
      `${BASE_URL}/${enrollmentId}/learning-position`,
      input,
    );
    return response.data;
  },
  isUserEnrolledInCourse: async function (courseId: string): Promise<boolean> {
    const response = await api.get<{ isEnrollment: boolean }>(
      `${BASE_URL}/me/enrolled/${courseId}`,
    );
    return response.data.isEnrollment;
  },
};
