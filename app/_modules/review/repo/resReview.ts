import { api } from "@/utils/axiosInstance";

import { CreateReviewDto } from "../dto/create-review";
import { UpdateReviewDto } from "../dto/update-review";
import { Review } from "../entities/review";
import { ReviewWithStudent } from "../entities/review-with-student";
import { IReviewAPI } from "./review";
import { PaginatedReviews } from "../entities/paginated-reviews";

export const resReview: IReviewAPI = {
  createReview: async function (
    courseId: string,
    data: CreateReviewDto,
  ): Promise<Review> {
    const response = await api.post<Review>(
      `/api/courses/${courseId}/reviews`,
      data,
    );

    return response.data;
  },

  getCourseReviews: async function (
    courseId: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedReviews<ReviewWithStudent>> {
    const response = await api.get<PaginatedReviews<ReviewWithStudent>>(
      `/api/courses/${courseId}/reviews`,
      {
        params: { page, limit },
      },
    );

    return response.data;
  },

  getMyReviews: async function (
    page = 1,
    limit = 10,
  ): Promise<PaginatedReviews<Review>> {
    const response = await api.get<PaginatedReviews<Review>>(
      "/api/reviews/me",
      {
        params: { page, limit },
      },
    );

    return response.data;
  },

  getReviewById: async function (reviewId: string): Promise<Review> {
    const response = await api.get<Review>(`/api/reviews/${reviewId}`);

    return response.data;
  },

  updateReview: async function (
    reviewId: string,
    data: UpdateReviewDto,
  ): Promise<Review> {
    const response = await api.patch<Review>(`/api/reviews/${reviewId}`, data);

    return response.data;
  },

  deleteReview: async function (reviewId: string): Promise<Review> {
    const response = await api.delete<Review>(`/api/reviews/${reviewId}`);

    return response.data;
  },
};
