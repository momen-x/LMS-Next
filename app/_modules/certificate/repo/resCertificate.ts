import { api } from "@/utils/axiosInstance";

import { Certificate } from "../entities/certificate";
import { ICertificateAPI } from "./certificate";
import { UserCertificate } from "../entities/user-certificates";
import { PublicCertificate } from "../entities/public-certificate";

export const resCertificate: ICertificateAPI = {
  createCertificate: async function (
    courseId: string,
    studentId: string,
  ): Promise<Certificate> {
    const response = await api.post<Certificate>(
      `/api/courses/${courseId}/certificates/${studentId}`,
    );

    return response.data;
  },

  getCourseCertificates: async function (
    courseId: string,
  ): Promise<UserCertificate[]> {
    const response = await api.get<UserCertificate[]>(
      `/api/courses/${courseId}/certificates`,
    );

    return response.data;
  },

  getMyCertificates: async function (): Promise<UserCertificate[]> {
    const response = await api.get<UserCertificate[]>("/api/certificates/me");

    return response.data;
  },

  getCertificateByNumber: async function (
    courseId: string,
    certificateNumber: string,
  ): Promise<Certificate | null> {
    const response = await api.get<Certificate | null>(
      `/api/courses/${courseId}/certificates/search/by-number`,
      {
        params: {
          certificateNumber,
        },
      },
    );

    return response.data;
  },

  getStudentCertificates: async function (
    courseId: string,
    studentId: string,
  ): Promise<Certificate[]> {
    const response = await api.get<Certificate[]>(
      `/api/courses/${courseId}/certificates/student/${studentId}`,
    );

    return response.data;
  },

  getCertificateById: async function (
    courseId: string,
    certificateId: string,
  ): Promise<Certificate> {
    const response = await api.get<Certificate>(
      `/api/courses/${courseId}/certificates/${certificateId}`,
    );

    return response.data;
  },

  deleteCertificate: async function (
    courseId: string,
    certificateId: string,
  ): Promise<Certificate> {
    const response = await api.delete<Certificate>(
      `/api/courses/${courseId}/certificates/${certificateId}`,
    );

    return response.data;
  },
  getUserCertificates: async function (userId: string): Promise<Certificate[]> {
    const res = await api.get<Certificate[]>(
      `/api/certificates/${userId}/certificates`,
    );
    return res.data;
  },
  findById: async function (id: string): Promise<UserCertificate> {
    const res = await api.get<UserCertificate>(`/api/certificates/${id}`);
    return res.data;
  },
  findPublicByCertificateNum: async function (
    certificateNumber: string,
  ): Promise<PublicCertificate> {
    const res = await api.get<PublicCertificate>(
      `/api/certificates/public/${certificateNumber}`,
    );
    return res.data;
  },
};
