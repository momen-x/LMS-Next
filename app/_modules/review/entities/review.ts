export interface Review  {
  id: string;
  studentId: string;
  courseId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};