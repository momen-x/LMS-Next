export type NotificationType = "info" | "warning" | "success" | "error";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  text: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface NotificationPage {
  data: Notification[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UnreadNotificationCount {
  count: number;
}

export interface MarkAllNotificationsReadResponse {
  updated: number;
}

export interface DeleteNotificationResponse {
  success: boolean;
}
