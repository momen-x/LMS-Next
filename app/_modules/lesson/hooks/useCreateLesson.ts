import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { resLesson } from "../repo/resLesson";
import { Lesson_KEYS } from "./useGetSectionLessons";
import { Lesson } from "../entity/lesson";
import { CreateLessonData } from "../dto/create-lesson";

export const useCreateLesson = (): UseMutationResult<
  Lesson,
  Error,
  { sectionId: string; data: CreateLessonData }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sectionId, data }) => resLesson.create(sectionId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: Lesson_KEYS.sectionList(data.sectionId),
      });
    },
  });
};
