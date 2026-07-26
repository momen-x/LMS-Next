import type { Review } from "./review";

export type ReviewStudent = {
  id: string;
  name: string;
  avatar: string | null;
};

export type ReviewWithStudent = Review & {
  student: ReviewStudent;
};
