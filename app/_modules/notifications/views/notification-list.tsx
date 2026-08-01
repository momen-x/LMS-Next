"use client";

import { BellOff } from "lucide-react";

import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useGetNotifications } from "../hooks/useGetNotifications";

import NotificationItem from "./notification-item";

type NotificationListProps = {
  page?: number;
  limit?: number;
};

export default function NotificationList({
  page = 1,
  limit = 10,
}: NotificationListProps) {
  const { data, isPending, isError, error } = useGetNotifications(page, limit);

  if (isPending) {
    return (
      <div className="space-y-2 p-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-24 animate-pulse items-start gap-3 rounded-xl border bg-muted/40 p-4"
          >
            <div className="size-10 shrink-0 rounded-full bg-muted" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-1/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-52 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <BellOff className="size-6 text-destructive" />
        </div>

        <h3 className="mt-3 font-semibold text-destructive">
          Failed to load notifications
        </h3>

        <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  const notifications = data?.data ?? [];

  if (notifications.length === 0) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <BellOff className="size-6 text-muted-foreground" />
        </div>

        <h3 className="mt-3 font-semibold">No notifications yet</h3>

        <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
          Updates about courses, reviews, enrollments, and certificates will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-96 divide-y overflow-y-auto overscroll-contain">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
