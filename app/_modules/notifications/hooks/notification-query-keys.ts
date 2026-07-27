export const notificationQueryKeys = {
  all: ["notifications"] as const,

  list: (page: number, limit: number) =>
    [...notificationQueryKeys.all, "list", page, limit] as const,

  unread: (page: number, limit: number) =>
    [...notificationQueryKeys.all, "unread", page, limit] as const,

  unreadCount: () => [...notificationQueryKeys.all, "unread-count"] as const,
};
