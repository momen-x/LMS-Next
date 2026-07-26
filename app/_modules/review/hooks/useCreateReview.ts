import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateReviewDto } from "../dto/create-review";
import { resReview } from "../repo/resReview";
import { reviewQueryKeys } from "./review-query-keys";

interface CreateReviewVariables {
  courseId: string;
  data: CreateReviewDto;
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, data }: CreateReviewVariables) =>
      resReview.createReview(courseId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.mine(),
      });

      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "course", variables.courseId],
      });
    },
  });
}
