import { useQueryClient, useMutation } from "@tanstack/react-query";

import { resLesson } from "../repo/resLesson";
import { Lesson_KEYS } from "./useGetSectionLessons";

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => resLesson.delete(lessonId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: Lesson_KEYS.sectionList(data.sectionId),
      });
    },
  });
};
