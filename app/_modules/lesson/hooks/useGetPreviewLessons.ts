import { useQuery } from "@tanstack/react-query";

import { resLesson } from "../repo/resLesson";
import { Lesson_KEYS } from "./useGetSectionLessons";

export const useGetPreviewLessons = (
  courseId: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: Lesson_KEYS.previewList(courseId),
    queryFn: () => resLesson.getIsPreviewLessons(courseId),
    enabled: enabled && Boolean(courseId),
  });
};
