"use client";

import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ReviewWithStudent } from "../entities/review-with-student";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

interface ReviewCardProps {
  review: ReviewWithStudent;
  canManage?: boolean;
  onEdit?: (review: ReviewWithStudent) => void;
  onDelete?: (review: ReviewWithStudent) => void;
  isDeleting?: boolean;
}

export default function ReviewCard({
  review,
  canManage = false,
  onEdit,
  onDelete,
  isDeleting = false,
}: ReviewCardProps) {
  const studentInitial =
    review.student.name.trim().charAt(0).toUpperCase() || "U";

  const formattedDate = transformingTheDateToATextString(review.createdAt);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={review.student.avatar ?? undefined}
              alt={review.student.name}
            />

            <AvatarFallback>{studentInitial}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">{review.student.name}</h3>

            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        {canManage && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(review)}
            >
              Edit
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isDeleting}
              onClick={() => onDelete?.(review)}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        )}
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
