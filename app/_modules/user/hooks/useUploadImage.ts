import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { User } from "../entity/user";
import { TUploadUserAvatar } from "../dto/update-user-profile";
import { resUserAPI } from "../repo/resUser";
import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";
import { USERS_KEY } from "./useGetAllUsers";

export const useUploadAvatar = (): UseMutationResult<
  User,
  Error,
  TUploadUserAvatar
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resUserAPI.uploadAvatar,

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, updatedUser);

      await queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      });
    },
  });
};
