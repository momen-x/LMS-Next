import { CreateReviewDto } from "../dto/create-review";
import { UpdateReviewDto } from "../dto/update-review";
import { Review } from "../entity/review";
import { ReviewWithStudent } from "../entity/review-with-student";
import { PaginatedReviews } from "../entity/paginated-reviews";

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
}
