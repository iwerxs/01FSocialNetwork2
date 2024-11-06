//src/app/(main)/MenuBar.tsx

import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { read } from "fs";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./NotificationsButton";
import streamServerClient from "@/lib/stream";
import MessagesButton from "./MessagesButton";

//style menu bar from outside of component
interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationCount, unreadMessageCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <div className={className}>
      {/* Home Button */}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Posts</span>
        </Link>
      </Button>
      {/* Notification Button */}
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
      <MessagesButton initialState={{ unreadCount: unreadMessageCount }} />
      {/* Button moved to MessagesButton Component */}
      {/* <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <Link href="/notifications">
          <Bell />
          <span className="hidden lg:inline">Notification</span>
        </Link>
      </Button> */}
      {/* Message Button */}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <Link href="/messages">
          <Mail />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>
      {/* Bookmark Button */}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
