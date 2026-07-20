import { useMutation } from "@tanstack/react-query";
import { resAuth } from "@/app/_modules/auth/repo/resAuth";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: resAuth.forgotPassword,
    retry: false,
  });
};
