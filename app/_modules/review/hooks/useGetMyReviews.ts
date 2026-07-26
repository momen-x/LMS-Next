import { useQuery } from "@tanstack/react-query";

import { ReviewQueryDto } from "../dto/review-query.dto";
import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

export function useGetMyReviews(query?: ReviewQueryDto) {
  return useQuery({
    queryKey: reviewQueryKeys.mine(query),
    queryFn: () => resReview.getMyReviews(query?.page, query?.limit),
  });
}
