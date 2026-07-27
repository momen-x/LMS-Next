import { useQuery } from "@tanstack/react-query";

import { resNotification } from "../repo/resNotification";
import { notificationQueryKeys } from "./notification-query-keys";

export function useGetUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationQueryKeys.unreadCount(),
    queryFn: () => resNotification.getUnreadCount(),
  });
}
