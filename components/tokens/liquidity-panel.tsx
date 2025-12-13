import type { TokenLiquidity } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, TrendingUp, TrendingDown, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiquidityPanelProps {
  liquidity?: TokenLiquidity
}

export function LiquidityPanel({ liquidity }: LiquidityPanelProps) {
  if (!liquidity) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Liquidity
          </CardTitle>
          <CardDescription>No liquidity data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Liquidity information will appear here once available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5" />
          Liquidity
        </CardTitle>
        <CardDescription>
          {liquidity.dex} - {liquidity.baseToken}/{liquidity.quoteToken}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Total Liquidity</p>
            <p className="text-2xl font-bold">${(liquidity.liquidityUsd / 1e6).toFixed(2)}M</p>
            <div
              className={cn(
                "flex items-center gap-1 text-sm mt-1",
                liquidity.liquidityChange24h >= 0 ? "text-chart-2" : "text-destructive",
              )}
            >
              {liquidity.liquidityChange24h >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {liquidity.liquidityChange24h > 0 ? "+" : ""}
              {liquidity.liquidityChange24h.toFixed(2)}% (24h)
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">LP Holders</p>
            <p className="text-2xl font-bold">{liquidity.lpHolders.length}</p>
            <p className="text-sm text-muted-foreground mt-1">unique addresses</p>
          </div>
        </div>

        {/* Pool Info */}
        <div className="p-4 rounded-lg bg-secondary/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">DEX</span>
            <Badge variant="outline">{liquidity.dex}</Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pair</span>
            <span className="text-sm font-mono">
              {liquidity.baseToken}/{liquidity.quoteToken}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Pool Address</span>
            <a href="#" className="text-sm font-mono text-primary hover:underline flex items-center gap-1">
              {liquidity.pairAddress.slice(0, 8)}...
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
