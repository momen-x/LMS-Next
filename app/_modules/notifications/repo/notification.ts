import {
  Notification,
  DeleteNotificationResponse,
  MarkAllNotificationsReadResponse,
  NotificationPage,
  UnreadNotificationCount,
} from "../entity/notification";

export interface INotificationAPI {
  getNotifications(page?: number, limit?: number): Promise<NotificationPage>;

  getUnreadNotifications(
    page?: number,
    limit?: number,
  ): Promise<NotificationPage>;

  getUnreadCount(): Promise<UnreadNotificationCount>;

  markNotificationAsRead(notificationId: string): Promise<Notification>;

  markAllNotificationsAsRead(): Promise<MarkAllNotificationsReadResponse>;

  deleteNotification(
    notificationId: string,
  ): Promise<DeleteNotificationResponse>;
}
