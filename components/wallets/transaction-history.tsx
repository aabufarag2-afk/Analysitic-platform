"use client"

import type { WalletTransaction } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, RefreshCw, Droplets, ExternalLink, History } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface TransactionHistoryProps {
  transactions: WalletTransaction[]
  walletAddress: string
}

const typeConfig = {
  swap: { icon: RefreshCw, label: "Swap", color: "text-chart-1" },
  transfer: { icon: ArrowUpRight, label: "Transfer", color: "text-chart-2" },
  lp_add: { icon: Droplets, label: "Add LP", color: "text-chart-3" },
  lp_remove: { icon: Droplets, label: "Remove LP", color: "text-destructive" },
  mint: { icon: ArrowUpRight, label: "Mint", color: "text-chart-5" },
  burn: { icon: ArrowDownRight, label: "Burn", color: "text-destructive" },
}

export function TransactionHistory({ transactions, walletAddress }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Transaction History
        </CardTitle>
        <CardDescription>{transactions.length} transactions found</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions found for this wallet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const config = typeConfig[tx.type]
              const Icon = config.icon
              const isOutgoing = tx.from === walletAddress

              return (
                <div
                  key={tx.hash}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div
                    className={cn("h-10 w-10 rounded-lg flex items-center justify-center bg-secondary", config.color)}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{config.label}</span>
                      <Badge variant="outline" className="text-xs">
                        {tx.chain.toUpperCase()}
                      </Badge>
                      {isOutgoing ? (
                        <Badge variant="secondary" className="text-xs">
                          OUT
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs bg-chart-2/10 text-chart-2">
                          IN
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tx.tokenIn && tx.tokenOut ? (
                        <span>
                          {Number(tx.tokenIn.amount).toLocaleString()} {tx.tokenIn.symbol} →{" "}
                          {Number(tx.tokenOut.amount).toLocaleString()} {tx.tokenOut.symbol}
                        </span>
                      ) : tx.tokenIn ? (
                        <span>
                          {Number(tx.tokenIn.amount).toLocaleString()} {tx.tokenIn.symbol}
                        </span>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tx.from.slice(0, 8)}...{tx.from.slice(-4)} → {tx.to.slice(0, 8)}...{tx.to.slice(-4)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">${tx.valueUsd.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
