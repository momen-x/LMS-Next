import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateReviewDto } from "../dto/update-review";
import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

interface UpdateReviewVariables {
  reviewId: string;
  data: UpdateReviewDto;
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: UpdateReviewVariables) =>
      resReview.updateReview(reviewId, data),

    onSuccess: (review) => {
      queryClient.setQueryData(reviewQueryKeys.detail(review.id), review);

      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.mine(),
      });

      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "course", review.courseId],
      });
    },
  });
}
