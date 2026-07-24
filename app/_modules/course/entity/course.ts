export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";

export interface Course {
  id: string;
  categoryId: string;
  instructorId: string;
  title: string;
  description: string;
  thumbnail?: string;
  thumbnailPublicId?: string;
  price: number;
  level: CourseLevel;
  status: CourseStatus;
  language: string;
  averageRating: number;
  totalStudents: number;
  duration: number;
  lessonsCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
