import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => resReview.deleteReview(reviewId),

    onSuccess: (review) => {
      queryClient.removeQueries({
        queryKey: reviewQueryKeys.detail(review.id),
      });

      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.mine(),
      });

      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "course", review.courseId],
      });
    },
  });
}
