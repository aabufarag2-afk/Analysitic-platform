"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockAlerts, mockNotifications } from "@/lib/mock-data/alerts"
import {
  Bell,
  Plus,
  Fish,
  Droplets,
  TrendingUp,
  Shield,
  BarChart3,
  Trash2,
  Settings,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import type { AlertType, Severity } from "@/lib/types"

const alertTypeConfig: Record<AlertType, { icon: typeof Bell; label: string; description: string }> = {
  whale_movement: { icon: Fish, label: "Whale Movement", description: "Large wallet transactions" },
  lp_change: { icon: Droplets, label: "LP Change", description: "Liquidity pool modifications" },
  price_anomaly: { icon: TrendingUp, label: "Price Anomaly", description: "Unusual price movements" },
  rug_warning: { icon: Shield, label: "Rug Warning", description: "Rug pull risk detection" },
  volume_spike: { icon: BarChart3, label: "Volume Spike", description: "Abnormal trading volume" },
}

const severityConfig: Record<Severity, { icon: typeof Info; color: string; bg: string }> = {
  low: { icon: Info, color: "text-chart-1", bg: "bg-chart-1/10" },
  medium: { icon: AlertTriangle, color: "text-chart-3", bg: "bg-chart-3/10" },
  high: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  critical: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map((a) => (a.id === alertId ? { ...a, isActive: !a.isActive } : a)))
  }

  const markAsRead = (notifId: string) => {
    setNotifications(notifications.map((n) => (n.id === notifId ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-muted-foreground">Real-time notifications for whales, LP changes, and anomalies</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
              <DialogDescription>Set up a new alert to track on-chain activity</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select defaultValue="whale_movement">
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(alertTypeConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <config.icon className="h-4 w-4" />
                          {config.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Chain</Label>
                <Select defaultValue="solana">
                  <SelectTrigger>
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="bnb">BNB Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Target Address</Label>
                <Input placeholder="Token or wallet address" className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label>Threshold</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Value" className="bg-secondary" />
                  <Select defaultValue="usd">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="percent">%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Alert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{alerts.filter((a) => a.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Triggered Today</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.severity === "critical" && !n.isRead).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications" className="relative">
            Notifications
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Alert triggers from your active rules</CardDescription>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => {
                  const severity = severityConfig[notif.severity]
                  const SeverityIcon = severity.icon

                  return (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-lg transition-colors cursor-pointer",
                        notif.isRead ? "bg-secondary/30" : "bg-secondary/70 hover:bg-secondary",
                      )}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", severity.bg)}>
                        <SeverityIcon className={cn("h-5 w-5", severity.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn("font-medium", !notif.isRead && "text-foreground")}>{notif.title}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              notif.severity === "critical" && "text-destructive border-destructive/30",
                              notif.severity === "high" && "text-destructive border-destructive/30",
                              notif.severity === "medium" && "text-chart-3 border-chart-3/30",
                              notif.severity === "low" && "text-chart-1 border-chart-1/30",
                            )}
                          >
                            {notif.severity.toUpperCase()}
                          </Badge>
                          {!notif.isRead && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{notif.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>Manage your active alert configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => {
                  const config = alertTypeConfig[alert.alertType]
                  const Icon = config.icon

                  return (
                    <div
                      key={alert.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg",
                        alert.isActive ? "bg-secondary" : "bg-secondary/30",
                      )}
                    >
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          alert.isActive ? "bg-primary/10" : "bg-muted",
                        )}
                      >
                        <Icon className={cn("h-5 w-5", alert.isActive ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{config.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {alert.chain.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {alert.targetType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {alert.targetAddress.slice(0, 12)}...{alert.targetAddress.slice(-8)}
                        </p>
                        {alert.threshold && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Threshold:{" "}
                            {Object.entries(alert.threshold)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={alert.isActive} onCheckedChange={() => toggleAlert(alert.id)} />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
