import { useQuery } from "@tanstack/react-query";
import { resCategory } from "../repo/resCategory";

export const CATEGORIES_KEY = "categories";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: resCategory.getAll,
  });
};
