import { useQuery } from "@tanstack/react-query";
import { resAuth } from "../repo/resAuth";
import { authKeys } from "../utils/constants";

export const useGetCsrfToken = () => {
  return useQuery({
    queryKey: authKeys.csrf(),
    queryFn: resAuth.csrfToken,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
