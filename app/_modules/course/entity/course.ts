export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus =
  | "draft"
  | "published"
  | "archived"
  | "pending_review";

export interface Course {
  id: string;
  categoryId: string;
  instructorId: string;
  title: string;
  description: string;
  thumbnail: string | null;
  thumbnailPublicId: string | null;
  price: number;
  level: CourseLevel;
  status: CourseStatus;
  language: string;
  averageRating: number;
  totalStudents: number;
  duration: number;
  lessonsCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
