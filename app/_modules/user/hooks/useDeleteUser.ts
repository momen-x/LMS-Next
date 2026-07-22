import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resUserAPI } from "../repo/resUser";
import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";
import { USERS_KEY } from "./useGetAllUsers";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resUserAPI.deleteUser,

    onSuccess: async () => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);

      queryClient.removeQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      });

      await queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      });
    },
  });
};
