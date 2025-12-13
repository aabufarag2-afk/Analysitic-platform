import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm",
                trend === "up" && "text-chart-2",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground",
              )}
            >
              {trend === "up" && <TrendingUp className="h-3 w-3" />}
              {trend === "down" && <TrendingDown className="h-3 w-3" />}
              {change > 0 ? "+" : ""}
              {change}%
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsGrid() {
  const stats = [
    {
      title: "Total Value Locked",
      value: "$13.7B",
      change: 4.2,
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "24h Volume",
      value: "$2.99B",
      change: -2.1,
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      trend: "down" as const,
    },
    {
      title: "Active Wallets",
      value: "1.8M",
      change: 12.5,
      icon: <Users className="h-5 w-5 text-primary" />,
      trend: "up" as const,
    },
    {
      title: "Transactions",
      value: "58M",
      change: 8.3,
      icon: <Activity className="h-5 w-5 text-primary" />,
      trend: "up" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
