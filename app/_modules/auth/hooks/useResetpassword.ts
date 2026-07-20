import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { resAuth } from "@/app/_modules/auth/repo/resAuth";
import { ResetPasswordData } from "../dto/reset-password";

export const useResetPassword = (): UseMutationResult<
  { success: boolean },
  Error,
  { token: string; data: ResetPasswordData }
> => {
  return useMutation({
    mutationFn: ({ token, data }) => resAuth.resetPassword(token, data),
    retry: false,
    onError: (error) => {
      console.error(error);
    },
  });
};
