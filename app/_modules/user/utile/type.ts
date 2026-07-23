import { User } from "../entity/user";

export interface GetAllUsersResponse {
  users: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
