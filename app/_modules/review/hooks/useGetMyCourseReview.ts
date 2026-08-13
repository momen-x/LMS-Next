import { useQuery } from "@tanstack/react-query";

import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

export function useGetMyCourseReview(courseId: string, enabled = true) {
  return useQuery({
    queryKey: reviewQueryKeys.mineByCourse(courseId),
    queryFn: () => resReview.getMyCourseReview(courseId),
    enabled: enabled && Boolean(courseId),
  });
}
