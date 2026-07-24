import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resSection } from "../repo/resSection";
import { CreateSectionData } from "../dto/create-section";
import { Section } from "../entity/section";
import { SECTION_KEYS } from "./useGetCourseSections";

export const useCreateSection = (): UseMutationResult<
  Section,
  Error,
  { courseId: string; data: CreateSectionData }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, data }) => resSection.create(courseId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: SECTION_KEYS.courseList(data.courseId),
      });
    },
  });
};
