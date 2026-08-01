"use client";

import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  Info,
  Trash2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

import { Notification } from "../entity/notification";
import { useDeleteNotification } from "../hooks/useDeleteNotification";

interface NotificationItemProps {
  notification: Notification;
}

const notificationTypeConfig = {
  info: {
    icon: Info,
    iconClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    unreadClassName: "bg-blue-500/5 hover:bg-blue-500/10",
  },

  success: {
    icon: CheckCircle2,
    iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    unreadClassName: "bg-emerald-500/5 hover:bg-emerald-500/10",
  },

  warning: {
    icon: AlertTriangle,
    iconClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    unreadClassName: "bg-amber-500/5 hover:bg-amber-500/10",
  },

  error: {
    icon: XCircle,
    iconClassName: "bg-destructive/10 text-destructive",
    unreadClassName: "bg-destructive/5 hover:bg-destructive/10",
  },
} as const;

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const { mutate: deleteNotification, isPending } = useDeleteNotification();

  const config =
    notificationTypeConfig[notification.type] ?? notificationTypeConfig.info;

  const NotificationIcon = config.icon;

  return (
    <article
      className={cn(
        "group relative flex items-start gap-3 px-4 py-4 transition-colors",
        notification.isRead
          ? "bg-background hover:bg-muted/30"
          : config.unreadClassName,
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          config.iconClassName,
        )}
      >
        <NotificationIcon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "text-sm leading-5",
                notification.isRead
                  ? "font-medium"
                  : "font-semibold text-foreground",
              )}
            >
              {notification.title}
            </h3>

            <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-muted-foreground">
              {notification.text}
            </p>
          </div>

          {!notification.isRead && (
            <span
              className={cn(
                "mt-1.5 size-2 shrink-0 rounded-full",
                notification.type === "success" && "bg-emerald-500",
                notification.type === "warning" && "bg-amber-500",
                notification.type === "error" && "bg-destructive",
                notification.type === "info" && "bg-blue-500",
              )}
              aria-label="Unread notification"
            />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <time className="text-xs text-muted-foreground">
            {transformingTheDateToATextString(notification.createdAt)}
          </time>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isPending}
            className="size-8 shrink-0 text-muted-foreground opacity-70 transition-opacity hover:text-destructive group-hover:opacity-100"
            aria-label={`Delete notification: ${notification.title}`}
            onClick={() => deleteNotification(notification.id)}
          >
            {isPending ? (
              <CircleAlert className="size-4 animate-pulse" />
            ) : (
              <Trash2 className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
