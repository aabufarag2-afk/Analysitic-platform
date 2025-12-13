import type { WalletInfo, WalletHolding } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface WalletStatsProps {
  wallet: WalletInfo
  holdings: WalletHolding[]
}

export function WalletStats({ wallet, holdings }: WalletStatsProps) {
  const totalPnl = holdings.reduce((acc, h) => acc + (h.pnl || 0), 0)
  const avgPnlPercentage =
    holdings.filter((h) => h.pnlPercentage !== undefined).reduce((acc, h) => acc + (h.pnlPercentage || 0), 0) /
      holdings.filter((h) => h.pnlPercentage !== undefined).length || 0

  const stats = [
    {
      label: "Total Value",
      value: `$${(wallet.totalValueUsd / 1e6).toFixed(2)}M`,
    },
    {
      label: "Tokens Held",
      value: wallet.tokenCount.toString(),
    },
    {
      label: "Total P&L",
      value: `${totalPnl >= 0 ? "+" : ""}$${(totalPnl / 1e6).toFixed(2)}M`,
      isPositive: totalPnl >= 0,
    },
    {
      label: "Avg Return",
      value: `${avgPnlPercentage >= 0 ? "+" : ""}${avgPnlPercentage.toFixed(1)}%`,
      isPositive: avgPnlPercentage >= 0,
    },
    {
      label: "Transactions",
      value: wallet.txCount.toLocaleString(),
    },
    {
      label: "Last Active",
      value: formatDistanceToNow(new Date(wallet.lastTxAt), { addSuffix: true }),
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p
              className={`text-xl font-bold mt-1 ${
                stat.isPositive !== undefined ? (stat.isPositive ? "text-chart-2" : "text-destructive") : ""
              }`}
            >
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
