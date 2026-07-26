/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { createReviewSchema, CreateReviewDto } from "../dto/create-review";

import { useCreateReview } from "../hooks/useCreateReview";
import { useUpdateReview } from "../hooks/useUpdateReview";

interface ReviewFormProps {
  courseId: string;
  reviewId?: string;
  defaultValues?: CreateReviewDto;
  onSuccess?: () => void;
}

const INITIAL_VALUES: CreateReviewDto = {
  rating: 1,
  comment: "",
};

export default function ReviewForm({
  courseId,
  reviewId,
  defaultValues,
  onSuccess,
}: ReviewFormProps) {
  const isEditing = Boolean(reviewId);

  const createReview = useCreateReview();
  const updateReview = useUpdateReview();

  const form = useForm<CreateReviewDto>({
    resolver: zodResolver(createReviewSchema as any),
    defaultValues: defaultValues ?? INITIAL_VALUES,
  });

  const rating = form.watch("rating");

  const isPending = createReview.isPending || updateReview.isPending;

  const onSubmit = (values: CreateReviewDto) => {
    if (reviewId) {
      updateReview.mutate(
        {
          reviewId,
          data: values,
        },
        {
          onSuccess: () => {
            toast.success("Review updated successfully");
            onSuccess?.();
          },
        },
      );

      return;
    }

    createReview.mutate(
      {
        courseId,
        data: values,
      },
      {
        onSuccess: () => {
          toast.success("Review created successfully");
          form.reset(INITIAL_VALUES);
          onSuccess?.();
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`Rate ${value} out of 5`}
                onClick={() =>
                  form.setValue("rating", value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              >
                <Star
                  className={
                    value <= rating
                      ? "size-6 fill-yellow-400 text-yellow-400"
                      : "size-6 text-muted-foreground"
                  }
                />
              </button>
            ))}
          </div>

          {form.formState.errors.rating && (
            <p className="text-sm text-destructive">
              {form.formState.errors.rating.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="review-comment" className="text-sm font-medium">
            Comment
          </label>

          <Textarea
            id="review-comment"
            placeholder="Write your opinion about this course..."
            rows={5}
            {...form.register("comment")}
          />

          {form.formState.errors.comment && (
            <p className="text-sm text-destructive">
              {form.formState.errors.comment.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving..."
            : isEditing
              ? "Update Review"
              : "Submit Review"}
        </Button>
      </form>
    </FormProvider>
  );
}
