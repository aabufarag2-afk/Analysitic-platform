"use client"

import type { TokenLiquidity } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, AlertTriangle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface HoldersDistributionProps {
  liquidity: TokenLiquidity
}

export function HoldersDistribution({ liquidity }: HoldersDistributionProps) {
  const topHolderPercentage = liquidity.lpHolders[0]?.percentage || 0
  const isConcentrated = topHolderPercentage > 50

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              LP Holders Distribution
            </CardTitle>
            <CardDescription>Top holders of liquidity pool tokens</CardDescription>
          </div>
          {isConcentrated && (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Concentrated
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {liquidity.lpHolders.map((holder, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-6">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      className="text-sm font-mono hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {holder.address.slice(0, 8)}...{holder.address.slice(-4)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {holder.label && (
                      <Badge variant="secondary" className="text-xs">
                        {holder.label}
                      </Badge>
                    )}
                    {holder.isContract && (
                      <Badge variant="outline" className="text-xs">
                        Contract
                      </Badge>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      holder.percentage > 50 && "text-destructive",
                      holder.percentage > 20 && holder.percentage <= 50 && "text-chart-3",
                    )}
                  >
                    {holder.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={holder.percentage}
                  className={cn(
                    "h-2",
                    holder.percentage > 50 && "[&>div]:bg-destructive",
                    holder.percentage > 20 && holder.percentage <= 50 && "[&>div]:bg-chart-3",
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 rounded-lg bg-secondary/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{liquidity.lpHolders.length}</p>
              <p className="text-xs text-muted-foreground">Total Holders</p>
            </div>
            <div>
              <p className={cn("text-2xl font-bold", topHolderPercentage > 50 && "text-destructive")}>
                {topHolderPercentage.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">Top Holder</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {liquidity.lpHolders
                  .slice(0, 3)
                  .reduce((acc, h) => acc + h.percentage, 0)
                  .toFixed(1)}
                %
              </p>
              <p className="text-xs text-muted-foreground">Top 3 Combined</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
