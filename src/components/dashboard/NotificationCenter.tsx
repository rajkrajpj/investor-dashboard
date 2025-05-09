"use client";

import React, { useState } from "react";
import { Bell, Check, ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "action" | "warning";
  category: "investment" | "document" | "kyc" | "payment" | "system";
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

export default function NotificationCenter({
  notifications = defaultNotifications,
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onClearAll = () => {},
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "action") return notification.type === "action";
    return notification.category === activeTab;
  });

  return (
    <div className="relative bg-background">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="end">
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Notifications
              </CardTitle>
              <div className="flex items-center gap-2">
                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-2" align="end">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Filter by</p>
                      <div className="space-y-1">
                        <Button
                          variant={
                            activeTab === "investment" ? "default" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveTab("investment");
                            setFilterOpen(false);
                          }}
                        >
                          Investments
                        </Button>
                        <Button
                          variant={
                            activeTab === "document" ? "default" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveTab("document");
                            setFilterOpen(false);
                          }}
                        >
                          Documents
                        </Button>
                        <Button
                          variant={activeTab === "kyc" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveTab("kyc");
                            setFilterOpen(false);
                          }}
                        >
                          KYC/AML
                        </Button>
                        <Button
                          variant={
                            activeTab === "payment" ? "default" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveTab("payment");
                            setFilterOpen(false);
                          }}
                        >
                          Payments
                        </Button>
                        <Button
                          variant={activeTab === "system" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            setActiveTab("system");
                            setFilterOpen(false);
                          }}
                        >
                          System
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
                  Mark all read
                </Button>
              </div>
            </CardHeader>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="px-4 py-2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </TabsTrigger>
                  <TabsTrigger value="action">Actions</TabsTrigger>
                </TabsList>
              </div>

              <CardContent className="p-0">
                <ScrollArea className="h-[350px] px-4">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4 py-4">
                      {filteredNotifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={onMarkAsRead}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-[300px] items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        No notifications
                      </p>
                    </div>
                  )}
                </ScrollArea>

                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={onClearAll}
                  >
                    Clear all notifications
                  </Button>
                </div>
              </CardContent>
            </Tabs>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "action":
        return "bg-amber-500";
      case "warning":
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "investment":
        return { label: "Investment", variant: "secondary" as const };
      case "document":
        return { label: "Document", variant: "outline" as const };
      case "kyc":
        return { label: "KYC/AML", variant: "secondary" as const };
      case "payment":
        return { label: "Payment", variant: "secondary" as const };
      default:
        return { label: "System", variant: "outline" as const };
    }
  };

  const categoryBadge = getCategoryBadge(notification.category);

  return (
    <div
      className={`relative rounded-lg border p-4 ${notification.read ? "bg-background" : "bg-muted/30"}`}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <Badge variant={categoryBadge.variant}>{categoryBadge.label}</Badge>
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div
          className={`mt-1 h-2 w-2 rounded-full ${getTypeColor(notification.type)}`}
        />
        <div className="space-y-1">
          <p className="font-medium">{notification.title}</p>
          <p className="text-sm text-muted-foreground">
            {notification.message}
          </p>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              {notification.timestamp}
            </p>
            {notification.actionUrl && notification.actionLabel && (
              <Button size="sm" variant="link" className="h-auto p-0">
                {notification.actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data for default state
const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "Complete KYC Verification",
    message:
      "Your KYC verification is pending. Please complete it to proceed with your investments.",
    timestamp: "Just now",
    read: false,
    type: "action",
    category: "kyc",
    actionUrl: "/kyc",
    actionLabel: "Complete KYC",
  },
  {
    id: "2",
    title: "Investment Status Update",
    message:
      "Your investment in Tech Growth Fund has been successfully processed.",
    timestamp: "2 hours ago",
    read: false,
    type: "info",
    category: "investment",
  },
  {
    id: "3",
    title: "Document Ready for Signature",
    message:
      "A subscription agreement for Real Estate Opportunity Fund is ready for your signature.",
    timestamp: "Yesterday",
    read: true,
    type: "action",
    category: "document",
    actionUrl: "/documents/sign",
    actionLabel: "Sign Document",
  },
  {
    id: "4",
    title: "Payment Confirmation",
    message: "Your payment of $25,000 for Green Energy Fund has been received.",
    timestamp: "2 days ago",
    read: true,
    type: "info",
    category: "payment",
  },
  {
    id: "5",
    title: "New Investment Opportunity",
    message:
      "A new investment opportunity matching your interests is now available.",
    timestamp: "3 days ago",
    read: true,
    type: "info",
    category: "investment",
    actionUrl: "/offerings/new",
    actionLabel: "View Offering",
  },
  {
    id: "6",
    title: "System Maintenance",
    message:
      "The platform will be undergoing maintenance on Sunday, June 15 from 2AM to 4AM EST.",
    timestamp: "1 week ago",
    read: true,
    type: "warning",
    category: "system",
  },
];
