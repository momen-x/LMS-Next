"use client";

import { BellOff } from "lucide-react";

import {getErrorMessage} from "@/utils/get-axios-error-message";

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
      <div className="space-y-1 p-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5 text-center">
        <p className="font-medium text-destructive">
          Failed to load notifications
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <BellOff className="size-6 text-muted-foreground" />
        </div>

        <h3 className="mt-3 font-semibold">No notifications</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          New notifications will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {data.data.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
