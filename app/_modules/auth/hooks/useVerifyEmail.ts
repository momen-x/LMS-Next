import { useQuery } from "@tanstack/react-query";
import { resAuth } from "../repo/resAuth";

export const useVerifyEmail = (token: string | null) => {
  return useQuery({
    queryKey: ["auth", "verify-email", token],
    queryFn: () => resAuth.verifyEmail(token!),
    enabled: Boolean(token),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
