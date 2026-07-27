import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resNotification } from "../repo/resNotification";
import { notificationQueryKeys } from "./notification-query-keys";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      resNotification.deleteNotification(notificationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });
}
