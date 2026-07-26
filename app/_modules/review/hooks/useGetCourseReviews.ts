import { useQuery } from "@tanstack/react-query";

import { ReviewQueryDto } from "../dto/review-query.dto";
import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

export function useGetCourseReviews(courseId: string, query?: ReviewQueryDto) {
  return useQuery({
    queryKey: reviewQueryKeys.course(courseId, query),
    queryFn: () =>
      resReview.getCourseReviews(courseId, query?.page, query?.limit),
    enabled: Boolean(courseId),
  });
}
