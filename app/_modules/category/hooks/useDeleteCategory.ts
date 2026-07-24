import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_KEY } from "./useGetAllCategories";
import { resCategory } from "../repo/resCategory";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resCategory.delete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, data.id] });
    },
  });
};
