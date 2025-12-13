"use client"

import type { WalletHolding } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface WalletPnLProps {
  holdings: WalletHolding[]
}

export function WalletPnL({ holdings }: WalletPnLProps) {
  const totalValue = holdings.reduce((acc, h) => acc + h.valueUsd, 0)
  const totalPnl = holdings.reduce((acc, h) => acc + (h.pnl || 0), 0)
  const avgReturn =
    holdings.filter((h) => h.pnlPercentage !== undefined).reduce((acc, h) => acc + (h.pnlPercentage || 0), 0) /
      holdings.filter((h) => h.pnlPercentage !== undefined).length || 0

  const pieData = holdings.slice(0, 5).map((h) => ({
    name: h.tokenSymbol,
    value: h.valueUsd,
    percentage: h.percentage,
  }))

  const COLORS = [
    "oklch(0.7 0.18 180)",
    "oklch(0.65 0.2 145)",
    "oklch(0.75 0.15 60)",
    "oklch(0.6 0.2 280)",
    "oklch(0.55 0.22 25)",
  ]

  if (holdings.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Portfolio Overview</CardTitle>
        <CardDescription>Performance and allocation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* P&L Summary */}
        <div className="p-4 rounded-lg bg-secondary">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total P&L</p>
            <p className={cn("text-3xl font-bold", totalPnl >= 0 ? "text-chart-2" : "text-destructive")}>
              {totalPnl >= 0 ? "+" : ""}${(totalPnl / 1e6).toFixed(2)}M
            </p>
            <div
              className={cn(
                "flex items-center justify-center gap-1 mt-1",
                avgReturn >= 0 ? "text-chart-2" : "text-destructive",
              )}
            >
              {avgReturn >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm">
                {avgReturn >= 0 ? "+" : ""}
                {avgReturn.toFixed(1)}% avg return
              </span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${(value / 1e6).toFixed(2)}M`, "Value"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {pieData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
