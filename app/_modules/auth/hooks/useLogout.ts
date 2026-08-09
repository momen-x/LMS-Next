import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resAuth } from "../repo/resAuth";
import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resAuth.logout,
    onSuccess: () => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);

      queryClient.removeQueries({
        predicate: (query) => query.meta?.requiresAuth === true,
      });
    },
  });
};
