import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resUserAPI } from "../repo/resUser";
import { USERS_KEY } from "./useGetAllUsers";

export const useDeleteUserByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      resUserAPI.deleteUserAccountByAdmin(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      });
    },

    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};
