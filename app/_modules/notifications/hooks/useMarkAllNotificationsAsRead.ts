import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resNotification } from "../repo/resNotification";
import { notificationQueryKeys } from "./notification-query-keys";

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resNotification.markAllNotificationsAsRead(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });

      queryClient.setQueryData(notificationQueryKeys.unreadCount(), {
        count: 0,
      });
    },
  });
}
