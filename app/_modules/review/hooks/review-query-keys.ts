import type { ReviewQueryDto } from "../dto/review-query.dto";

export const reviewQueryKeys = {
  all: ["reviews"] as const,

  mine: (query?: ReviewQueryDto) =>
    [...reviewQueryKeys.all, "mine", query] as const,

  course: (courseId: string, query?: ReviewQueryDto) =>
    [...reviewQueryKeys.all, "course", courseId, query] as const,

  detail: (reviewId: string) =>
    [...reviewQueryKeys.all, "detail", reviewId] as const,
};
