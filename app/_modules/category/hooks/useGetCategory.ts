import { useQuery } from "@tanstack/react-query";
import { resCategory } from "../repo/resCategory";
import { CATEGORIES_KEY } from "./useGetAllCategories";


export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: [CATEGORIES_KEY, id],
    queryFn: () => resCategory.getOne(id),
    enabled: !!id,
  });
};
