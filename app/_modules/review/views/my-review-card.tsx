"use client";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Review } from "../entity/review";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

interface MyReviewCardProps {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (review: Review) => void;
  isDeleting?: boolean;
}

export default function MyReviewCard({
  review,
  onEdit,
  onDelete,
  isDeleting = false,
}: MyReviewCardProps) {
  const formattedDate =transformingTheDateToATextString(review.createdAt);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">My Review</h3>

          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(review)}
          >
            Edit
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={() => onDelete(review)}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div
          className="flex items-center gap-1"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={
                value <= review.rating
                  ? "size-5 fill-yellow-400 text-yellow-400"
                  : "size-5 text-muted-foreground"
              }
            />
          ))}
        </div>

        {review.comment && (
          <p className="whitespace-pre-wrap text-sm leading-6">
            {review.comment}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
