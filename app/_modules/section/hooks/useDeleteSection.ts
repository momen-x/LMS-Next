import { useQueryClient, useMutation } from "@tanstack/react-query";
import { resSection } from "../repo/resSection";
import { SECTION_KEYS } from "./useGetCourseSections";

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resSection.delete(id),
    onSuccess: (data) => {
      //for now will use the same key
      queryClient.invalidateQueries({
        queryKey: SECTION_KEYS.courseList(data.courseId),
      });
    },
  });
};
