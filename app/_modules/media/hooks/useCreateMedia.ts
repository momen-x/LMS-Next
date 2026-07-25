import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resMedia } from "../repo/resMedia";
import { MEDIA_KEYS } from "./useGetLessonMedia";



export function useCreateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      dto,
    }: {
      lessonId: string;
      dto: Parameters<typeof resMedia.create>[1];
    }) => resMedia.create(lessonId, dto),

    onSuccess: (media) => {
      queryClient.invalidateQueries({
        queryKey: MEDIA_KEYS.lesson(media.lessonId),
      });
    },
  });
}
