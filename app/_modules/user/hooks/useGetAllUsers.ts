import { useQuery } from "@tanstack/react-query";
import { resUserAPI } from "../repo/resUser";
import { UserRole } from "../entity/user";

export const USERS_KEY = "users";

type UseGetUsersParams = {
  page?: number;
  limit?: number;
  userRole?: UserRole;
};

export const useGetUsers = ({
  page = 1,
  limit = 10,
  userRole,
}: UseGetUsersParams = {}) => {
  return useQuery({
    queryKey: [USERS_KEY, page, limit, userRole],
    queryFn: () => resUserAPI.getAll(page, limit, userRole),
  });
};
