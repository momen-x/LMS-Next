import { useQuery } from "@tanstack/react-query";

import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

export function useGetReviewById(reviewId: string) {
  return useQuery({
    queryKey: reviewQueryKeys.detail(reviewId),
    queryFn: () => resReview.getReviewById(reviewId),
    enabled: Boolean(reviewId),
  });
}