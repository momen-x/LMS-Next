import { api } from "@/utils/axiosInstance";

import { Notification ,  DeleteNotificationResponse,
  MarkAllNotificationsReadResponse,
  NotificationPage,
  UnreadNotificationCount,} from "../entity/notification";


import { INotificationAPI } from "./notification";

export const resNotification: INotificationAPI = {
  getNotifications: async function (
    page = 1,
    limit = 10,
  ): Promise<NotificationPage> {
    const response = await api.get<NotificationPage>("/api/notifications", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  },

  getUnreadNotifications: async function (
    page = 1,
    limit = 10,
  ): Promise<NotificationPage> {
    const response = await api.get<NotificationPage>("/api/notifications/unread", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  },

  getUnreadCount: async function (): Promise<UnreadNotificationCount> {
    const response = await api.get<UnreadNotificationCount>(
      "/api/notifications/unread/count",
    );

    return response.data;
  },

  markNotificationAsRead: async function (
    notificationId: string,
  ): Promise<Notification> {
    const response = await api.patch<Notification>(
      `/api/notifications/${notificationId}/read`,
    );

    return response.data;
  },

  markAllNotificationsAsRead:
    async function (): Promise<MarkAllNotificationsReadResponse> {
      const response = await api.patch<MarkAllNotificationsReadResponse>(
        "/api/notifications/read-all",
      );

      return response.data;
    },

  deleteNotification: async function (
    notificationId: string,
  ): Promise<DeleteNotificationResponse> {
    const response = await api.delete<DeleteNotificationResponse>(
      `/api/notifications/${notificationId}`,
    );

    return response.data;
  },
};
