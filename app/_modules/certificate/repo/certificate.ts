import { Certificate } from "../entity/certificate";

export interface ICertificateAPI {
  createCertificate(courseId: string, studentId: string): Promise<Certificate>;

  getCourseCertificates(courseId: string): Promise<Certificate[]>;
  getUserCertificates(studentId: string): Promise<Certificate[]>;

  getMyCertificates(): Promise<Certificate[]>;

  getCertificateByNumber(
    courseId: string,
    certificateNumber: string,
  ): Promise<Certificate | null>;

  getStudentCertificates(
    courseId: string,
    studentId: string,
  ): Promise<Certificate[]>;

  getCertificateById(
    courseId: string,
    certificateId: string,
  ): Promise<Certificate>;

  deleteCertificate(
    courseId: string,
    certificateId: string,
  ): Promise<Certificate>;
}
