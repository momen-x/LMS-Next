import { CreateEnrollmentInput } from "../dto/create-enrollment";
import { Enrollment } from "../entity/enrollment";
import { EnrollmentWithCourse } from "../entity/enrollment-course";
import { GetMyEnrollmentsParams } from "../types/get-my-enrollments";
import { IEnrollmentAPI } from "./enrollment";
import { api } from "@/utils/axiosInstance";

const BASE_URL = "/api/enrollments";

export const resEnrollment: IEnrollmentAPI = {
  createEnrollment: async function (
    courseId: string,
    input: CreateEnrollmentInput,
  ): Promise<Enrollment> {
    const res = await api.post<Enrollment>(
      `courses/${courseId}/enrollments`,
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
  ): Promise<Enrollment[]> {
    const res = await api.get<Enrollment[]>(`/courses/${courseId}/enrollments`);
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
};
