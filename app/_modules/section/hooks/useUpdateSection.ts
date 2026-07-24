import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resSection } from "../repo/resSection";
import { UpdateSectionData } from "../dto/update-section";
import { Section } from "../entity/section";
import { SECTION_KEYS } from "./useGetCourseSections";

export const useUpdateSection = (): UseMutationResult<
  Section,
  Error,
  { id: string; data: UpdateSectionData }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => resSection.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SECTION_KEYS.courseList(data.courseId),
      });
    },
  });
};
