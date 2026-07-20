import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "@/app/_modules/auth/repo/resAuth";
import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";

export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resAuth.refreshToken,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },

  });
};
