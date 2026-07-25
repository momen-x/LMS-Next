import { useQuery } from "@tanstack/react-query";

import { resLesson } from "../repo/resLesson";
import { Lesson_KEYS } from "./useGetSectionLessons";

export const useGetLesson = (lessonId: string) => {
  return useQuery({
    queryKey: Lesson_KEYS.detail(lessonId),
    queryFn: () => resLesson.getLesson(lessonId),
    enabled: !!lessonId,
  });
};
