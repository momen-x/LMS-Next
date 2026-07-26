export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  enrolledAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
