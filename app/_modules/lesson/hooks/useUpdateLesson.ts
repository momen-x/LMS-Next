import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { resLesson } from "../repo/resLesson";
import { Lesson_KEYS } from "./useGetSectionLessons";
import { Lesson } from "../entity/lesson";
import { UpdateLessonData } from "../dto/update-lesson";

export const useUpdateLesson = (): UseMutationResult<
  Lesson,
  Error,
  { lessonId: string; data: UpdateLessonData }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lessonId, data }) => resLesson.update(lessonId, data),

    onSuccess: (updatedLesson) => {
      queryClient.setQueryData(
        Lesson_KEYS.detail(updatedLesson.id),
        updatedLesson,
      );

      queryClient.invalidateQueries({
        queryKey: Lesson_KEYS.sectionList(updatedLesson.sectionId),
      });
    },
  });
};
