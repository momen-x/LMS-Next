import { useQuery } from "@tanstack/react-query";

import { resLesson } from "../repo/resLesson";

export const LESSON_KEY = "lesson";

export const useGetLesson = (
  lessonId: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [LESSON_KEY, lessonId],
    queryFn: () => resLesson.getLesson(lessonId),
    enabled: enabled && Boolean(lessonId),
  });
};