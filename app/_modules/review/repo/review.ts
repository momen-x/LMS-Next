import { CreateReviewDto } from "../dto/create-review";
import { UpdateReviewDto } from "../dto/update-review";
import { Review } from "../entities/review";
import { ReviewWithStudent } from "../entities/review-with-student";
import { PaginatedReviews } from "../entities/paginated-reviews";

export interface IReviewAPI {
  createReview(courseId: string, data: CreateReviewDto): Promise<Review>;

  getCourseReviews(
    courseId: string,
    page?: number,
    limit?: number,
  ): Promise<PaginatedReviews<ReviewWithStudent>>;

  getMyReviews(
    page?: number,
    limit?: number,
  ): Promise<PaginatedReviews<Review>>;

  getReviewById(reviewId: string): Promise<Review>;

  updateReview(reviewId: string, data: UpdateReviewDto): Promise<Review>;

  deleteReview(reviewId: string): Promise<Review>;
  getMyCourseReview(courseId: string): Promise<Review>;
}
