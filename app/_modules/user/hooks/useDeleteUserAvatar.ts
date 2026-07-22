import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";

import { resUserAPI } from "../repo/resUser";
import { User } from "../entity/user";
import { USERS_KEY } from "./useGetAllUsers";

export const useDeleteAvatar = (): UseMutationResult<User, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resUserAPI.deleteUserAvatar(),

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, updatedUser);

      await queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      });
    },
  });
};
