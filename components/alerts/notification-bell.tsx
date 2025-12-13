"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { mockNotifications } from "@/lib/mock-data/alerts"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function NotificationBell() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const severityColors = {
    low: "bg-chart-1/10 text-chart-1",
    medium: "bg-chart-3/10 text-chart-3",
    high: "bg-destructive/10 text-destructive",
    critical: "bg-destructive/20 text-destructive",
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.slice(0, 5).map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "p-3 border-b border-border cursor-pointer hover:bg-secondary/50 transition-colors",
                !notif.isRead && "bg-secondary/30",
              )}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="flex items-start gap-2">
                <div className={cn("h-2 w-2 rounded-full mt-1.5 flex-shrink-0", severityColors[notif.severity])} />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", !notif.isRead && "text-foreground")}>{notif.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-border">
          <Link href="/dashboard/alerts" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full">
              View all alerts
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
