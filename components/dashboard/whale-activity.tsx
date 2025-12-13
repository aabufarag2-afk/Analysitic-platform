"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTransactions } from "@/lib/mock-data/wallets"
import { ArrowUpRight, ArrowDownRight, RefreshCw, Droplets } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

const typeIcons = {
  swap: RefreshCw,
  transfer: ArrowUpRight,
  lp_add: Droplets,
  lp_remove: Droplets,
  mint: ArrowUpRight,
  burn: ArrowDownRight,
}

const typeColors = {
  swap: "text-chart-1",
  transfer: "text-chart-2",
  lp_add: "text-chart-3",
  lp_remove: "text-destructive",
  mint: "text-chart-5",
  burn: "text-destructive",
}

export function WhaleActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Whale Activity</CardTitle>
        <CardDescription>Recent large transactions across chains</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTransactions.map((tx) => {
            const Icon = typeIcons[tx.type]
            const colorClass = typeColors[tx.type]
            const timeAgo = formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })

            return (
              <div
                key={tx.hash}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className={cn("h-10 w-10 rounded-lg bg-secondary flex items-center justify-center", colorClass)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">{tx.type.replace("_", " ")}</span>
                    <Badge variant="outline" className="text-xs">
                      {tx.chain.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {tx.from.slice(0, 8)}...{tx.from.slice(-4)} → {tx.to.slice(0, 8)}...
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${tx.valueUsd.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{timeAgo}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
