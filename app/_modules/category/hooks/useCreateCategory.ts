import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_KEY } from "./useGetAllCategories";
import { resCategory } from "../repo/resCategory";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resCategory.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
    },
  });
};
