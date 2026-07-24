import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Category } from "../entity/category";
import { UpdateCategoryData } from "../dto/update-category";
import { resCategory } from "../repo/resCategory";
import { CATEGORIES_KEY } from "./useGetAllCategories";

export const useUpdateCategory = (): UseMutationResult<
  Category,
  Error,
  { data: UpdateCategoryData; id: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => resCategory.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_KEY, data.id] });
    },
  });
};
