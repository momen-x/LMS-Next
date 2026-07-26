"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { Review } from "../entity/review";
import { useGetMyReviews } from "../hooks/useGetMyReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";

import MyReviewCard from "./my-review-card";
import ReviewForm from "./review-form";

interface MyReviewsProps {
  limit?: number;
}

export default function MyReviews({ limit = 10 }: MyReviewsProps) {
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const {
    data: reviewsPage,
    isLoading,
    isError,
    refetch,
  } = useGetMyReviews({
    page,
    limit,
  });

  const deleteReview = useDeleteReview();

  const handleDelete = (review: Review) => {
    deleteReview.mutate(review.id, {
      onSuccess: () => {
        toast.success("Review deleted successfully");

        if (reviewsPage && reviewsPage.data.length === 1 && page > 1) {
          setPage((currentPage) => currentPage - 1);
        }
      },

      onError: () => {
        toast.error("Failed to delete review");
      },
    });
  };

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Loading your reviews...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 py-8 text-center">
        <p className="text-sm text-destructive">Failed to load your reviews.</p>

        <Button type="button" variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!reviewsPage || reviewsPage.data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        You have not written any reviews yet.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">My Reviews</h2>

        <p className="text-sm text-muted-foreground">
          {reviewsPage.total} reviews
        </p>
      </div>

      {selectedReview && (
        <div className="rounded-lg border p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Edit Review</h3>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedReview(null)}
            >
              Cancel
            </Button>
          </div>

          <ReviewForm
            courseId={selectedReview.courseId}
            reviewId={selectedReview.id}
            defaultValues={{
              rating: selectedReview.rating,
              comment: selectedReview.comment ?? "",
            }}
            onSuccess={() => setSelectedReview(null)}
          />
        </div>
      )}

      <div className="space-y-4">
        {reviewsPage.data.map((review) => (
          <MyReviewCard
            key={review.id}
            review={review}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={
              deleteReview.isPending && deleteReview.variables === review.id
            }
          />
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
