import { resMedia } from "./../repo/resMedia";
import { useQuery } from "@tanstack/react-query";

import { MEDIA_KEYS } from "./useGetLessonMedia";

export function useGetMedia(id: string) {
  return useQuery({
    queryKey: MEDIA_KEYS.detail(id),

    queryFn: () => resMedia.getById(id),

    enabled: !!id,
  });
}
