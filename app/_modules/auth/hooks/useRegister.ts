import { useMutation } from "@tanstack/react-query";
import { resAuth } from "@/app/_modules/auth/repo/resAuth";

export const useRegister = () => {
  return useMutation({
    mutationFn: resAuth.register,
    retry: false,
  });
};
