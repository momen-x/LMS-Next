import { useQuery } from "@tanstack/react-query";

import { resMedia } from "../repo/resMedia";

export const MEDIA_KEYS = {
  all: ["media"] as const,

  detail: (id: string) => [...MEDIA_KEYS.all, "detail", id] as const,

  lesson: (lessonId: string) =>
    [...MEDIA_KEYS.all, "lesson", lessonId] as const,
};

export function useGetLessonMedia(lessonId: string) {
  return useQuery({
    queryKey: MEDIA_KEYS.lesson(lessonId),

    queryFn: () => resMedia.getLessonMedia(lessonId),

    enabled: !!lessonId,
  });
}
