import { Course } from "./course";

export interface CourseWithInstructor extends Course {
  instructor: {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
  };
}