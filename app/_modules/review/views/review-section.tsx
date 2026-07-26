"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import CourseReviews from "./course-reviews";
import ReviewForm from "./review-form";

interface ReviewSectionProps {
  courseId: string;
  canCreateReview?: boolean;
}

export default function ReviewSection({
  courseId,
  canCreateReview = false,
}: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Course Reviews</h2>

          <p className="text-sm text-muted-foreground">
            Read what students think about this course.
          </p>
        </div>

        {canCreateReview && !showForm && (
          <Button type="button" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {canCreateReview && showForm && (
        <div className="rounded-lg border p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-semibold">Write Your Review</h3>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>

          <ReviewForm
            courseId={courseId}
            onSuccess={() => setShowForm(false)}
          />
        </div>
      )}

      <CourseReviews courseId={courseId} />
    </section>
  );
}
