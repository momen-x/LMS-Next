import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resMedia } from "../repo/resMedia";
import { MEDIA_KEYS } from "./useGetLessonMedia";

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resMedia.delete(id),

    onSuccess: (media) => {
      queryClient.invalidateQueries({
        queryKey: MEDIA_KEYS.lesson(media.lessonId),
      });

      queryClient.removeQueries({
        queryKey: MEDIA_KEYS.detail(media.id),
      });
    },
  });
}
