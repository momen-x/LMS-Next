"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useGetUnreadNotificationCount } from "../hooks/useGetUnreadNotificationCount";
import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";

import NotificationList from "./notification-list";

export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: unreadCount } = useGetUnreadNotificationCount();

  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (!open && (unreadCount?.count ?? 0) > 0) {
      markAllAsRead();
    }
  }

  const count = unreadCount?.count ?? 0;

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Open notifications"
          />
        }
      >
        <Bell className="size-5" />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-medium text-destructive-foreground">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" className="w-90 p-0">
        <div className="border-b px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Notifications</h2>

            {count > 0 && (
              <span className="text-xs text-muted-foreground">
                {count} unread
              </span>
            )}
          </div>
        </div>

        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
