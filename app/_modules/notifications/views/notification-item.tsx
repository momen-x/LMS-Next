"use client";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {getErrorMessage} from "@/utils/get-axios-error-message";

import { Notification, NotificationType } from "../entity/notification";
import { useDeleteNotification } from "../hooks/useDeleteNotification";

type NotificationItemProps = {
  notification: Notification;
};

const notificationIcons: Record<NotificationType, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

function formatNotificationDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const { mutate: deleteNotification, isPending } = useDeleteNotification();

  const Icon = notificationIcons[notification.type];

  function handleDelete() {
    deleteNotification(notification.id, {
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  }

  return (
    <div
      className={`flex items-start gap-3 border-b p-4 last:border-b-0 ${
        notification.isRead ? "bg-background" : "bg-primary/5"
      }`}
    >
      <div
        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${
          notification.isRead
            ? "bg-muted text-muted-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <h3
            className={`flex-1 text-sm ${
              notification.isRead ? "font-medium" : "font-semibold"
            }`}
          >
            {notification.title}
          </h3>

          {!notification.isRead && (
            <span
              className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
              aria-label="Unread notification"
            />
          )}
        </div>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {notification.text}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {formatNotificationDate(notification.createdAt)}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={handleDelete}
        aria-label="Delete notification"
        className="size-8 shrink-0"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
