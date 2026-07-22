import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { User } from "../entity/user";
import { TUpdatePasswordAPI } from "../dto/update-user-profile";
import { resUserAPI } from "../repo/resUser";
import { CURRENT_USER_QUERY_KEY } from "@/utils/constance";

export const useUpdatePassword = (): UseMutationResult<
  User,
  Error,
  TUpdatePasswordAPI
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resUserAPI.updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
    },
  });
};
