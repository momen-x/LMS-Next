import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resMedia } from "../repo/resMedia";
import { MEDIA_KEYS } from "./useGetLessonMedia";


export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: Parameters<typeof resMedia.update>[1];
    }) => resMedia.update(id, dto),

    onSuccess: (media) => {
      queryClient.invalidateQueries({
        queryKey: MEDIA_KEYS.lesson(media.lessonId),
      });

      queryClient.invalidateQueries({
        queryKey: MEDIA_KEYS.detail(media.id),
      });
    },
  });
}
