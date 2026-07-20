import { useMutation } from "@tanstack/react-query";
import { resAuth } from "@/app/_modules/auth/repo/resAuth";

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resAuth.resendVerification,
    retry: false,
 
  });
};
