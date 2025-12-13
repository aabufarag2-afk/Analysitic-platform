"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockWhaleWallets, mockTransactions } from "@/lib/mock-data/wallets"
import { Fish, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface WhaleTrackerProps {
  chain?: "solana" | "bnb"
}

export function WhaleTracker({ chain }: WhaleTrackerProps) {
  const whales = chain ? mockWhaleWallets.filter((w) => w.chain === chain) : mockWhaleWallets
  const recentActivity = chain ? mockTransactions.filter((t) => t.chain === chain) : mockTransactions

  // Determine whale sentiment based on recent transactions
  const buyActivity = recentActivity.filter(
    (t) => t.type === "swap" && t.tokenOut && !["USDC", "USDT", "SOL", "WBNB"].includes(t.tokenOut.symbol),
  ).length
  const sellActivity = recentActivity.filter(
    (t) => t.type === "swap" && t.tokenIn && !["USDC", "USDT", "SOL", "WBNB"].includes(t.tokenIn.symbol),
  ).length

  const sentiment =
    buyActivity > sellActivity ? "accumulating" : buyActivity < sellActivity ? "distributing" : "neutral"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fish className="h-5 w-5 text-primary" />
          Whale Tracker
        </CardTitle>
        <CardDescription>Real-time whale activity monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sentiment Indicator */}
        <div
          className={cn(
            "p-4 rounded-lg flex items-center justify-between",
            sentiment === "accumulating" && "bg-chart-2/10 border border-chart-2/30",
            sentiment === "distributing" && "bg-destructive/10 border border-destructive/30",
            sentiment === "neutral" && "bg-secondary",
          )}
        >
          <div className="flex items-center gap-2">
            {sentiment === "accumulating" ? (
              <TrendingUp className="h-5 w-5 text-chart-2" />
            ) : sentiment === "distributing" ? (
              <TrendingDown className="h-5 w-5 text-destructive" />
            ) : (
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="font-medium capitalize">Whales are {sentiment}</span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              sentiment === "accumulating" && "text-chart-2 border-chart-2/30",
              sentiment === "distributing" && "text-destructive border-destructive/30",
            )}
          >
            {buyActivity} buys / {sellActivity} sells
          </Badge>
        </div>

        {/* Top Whales */}
        <div>
          <p className="text-sm font-medium mb-3">Top Whales</p>
          <div className="space-y-2">
            {whales.slice(0, 4).map((whale) => (
              <Link
                key={whale.address}
                href={`/dashboard/wallets/${whale.address}`}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Fish className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{whale.label || `${whale.address.slice(0, 8)}...`}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(whale.lastTxAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono">${(whale.totalValueUsd / 1e6).toFixed(1)}M</p>
                  <Badge variant="outline" className="text-xs">
                    {whale.chain.toUpperCase()}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
