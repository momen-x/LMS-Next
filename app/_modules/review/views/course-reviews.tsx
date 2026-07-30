"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useGetCourseReviews } from "../hooks/useGetCourseReviews";
import ReviewCard from "./review-card";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";

interface CourseReviewsProps {
  courseId: string;
}

const REVIEWS_LIMIT = 10;

export default function CourseReviews({ courseId }: CourseReviewsProps) {
  const [page, setPage] = useState(1);

  const {
    data: reviewsPage,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetCourseReviews(courseId, {
    page,
    limit: REVIEWS_LIMIT,
  });

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load reviews"
        description="We couldn’t load the reviews for  this course."
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (!reviewsPage || reviewsPage.data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No reviews yet.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Student Reviews</h2>

        <p className="text-sm text-muted-foreground">
          {reviewsPage.total} reviews
        </p>
      </div>

      <div className="space-y-4">
        {reviewsPage.data.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {reviewsPage.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage((currentPage) => Math.max(currentPage - 1, 1))
            }
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {reviewsPage.page} of {reviewsPage.totalPages}
          </span>

          <Button
            type="button"
            variant="outline"
            disabled={page >= reviewsPage.totalPages}
            onClick={() => setPage((currentPage) => currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
