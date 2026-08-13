export interface UserCertificate {
  id: string;
  certificateNumber: string;
  courseId: string;
  createdAt: string;
  issueDate: string;
  studentId: string;
  updatedAt: string;
  course: {
    id: string;
    thumbnail: string;
    title: string;
    level: string;
    instructor: {
      avatar: string;
      email: string;
      id: string;
      name: string;
    };
  };
  student: { name: string; email: string; id: string; avatar: string };
}
