import { useQuery } from "@tanstack/react-query";

import { resNotification } from "../repo/resNotification";
import { notificationQueryKeys } from "./notification-query-keys";

export function useGetUnreadNotifications(page = 1, limit = 10) {
  return useQuery({
    queryKey: notificationQueryKeys.unread(page, limit),
    queryFn: () => resNotification.getUnreadNotifications(page, limit),
  });
}
