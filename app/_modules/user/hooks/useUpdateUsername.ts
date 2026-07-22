import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { User } from "../entity/user";
import { TUpdateUsername } from "../dto/update-user-profile";
import { resUserAPI } from "../repo/resUser";
import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";
import { USERS_KEY } from "./useGetAllUsers";

export const useUpdateUsername = (): UseMutationResult<
  User,
  Error,
  TUpdateUsername
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resUserAPI.updateUsername,

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, updatedUser);

      await queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      });
    },
  });
};
