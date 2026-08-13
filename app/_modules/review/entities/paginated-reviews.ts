export interface PaginatedReviews<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
