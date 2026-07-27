import { useQuery } from "@tanstack/react-query";

import { resNotification } from "../repo/resNotification";
import { notificationQueryKeys } from "./notification-query-keys";

export function useGetNotifications(page = 1, limit = 10) {
  return useQuery({
    queryKey: notificationQueryKeys.list(page, limit),
    queryFn: () => resNotification.getNotifications(page, limit),
  });
}