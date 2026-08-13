export interface PublicCertificate{
  certificateNumber: string;
  issueDate: string;

  student: {
    name: string;
  };

  course: {
    title: string;

    instructor: {
      name: string;
    };
  };
}