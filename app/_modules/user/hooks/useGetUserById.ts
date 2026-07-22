import { useQuery } from "@tanstack/react-query";
import { resUserAPI } from "../repo/resUser";
import { USERS_KEY } from "./useGetAllUsers";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [USERS_KEY, id],
    queryFn: () => resUserAPI.getById(id),
    enabled: Boolean(id),
  });
};
