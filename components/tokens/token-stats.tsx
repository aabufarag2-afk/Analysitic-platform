import type { TokenInfo, TokenLiquidity } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TokenStatsProps {
  token: TokenInfo
  liquidity?: TokenLiquidity
}

export function TokenStats({ token, liquidity }: TokenStatsProps) {
  const stats = [
    {
      label: "Price",
      value: `$${token.price < 0.01 ? token.price.toExponential(2) : token.price.toLocaleString()}`,
      change: token.priceChange24h,
    },
    {
      label: "Market Cap",
      value: `$${(token.marketCap / 1e6).toFixed(2)}M`,
    },
    {
      label: "24h Volume",
      value: `$${(token.volume24h / 1e6).toFixed(2)}M`,
    },
    {
      label: "Holders",
      value: token.holders.toLocaleString(),
    },
    {
      label: "Liquidity",
      value: liquidity ? `$${(liquidity.liquidityUsd / 1e6).toFixed(2)}M` : "N/A",
      change: liquidity?.liquidityChange24h,
    },
    {
      label: "Circulating Supply",
      value: `${((Number(token.circulatingSupply) / Number(token.totalSupply)) * 100).toFixed(1)}%`,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-bold mt-1">{stat.value}</p>
            {stat.change !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm mt-1",
                  stat.change >= 0 ? "text-chart-2" : "text-destructive",
                )}
              >
                {stat.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.change > 0 ? "+" : ""}
                {stat.change.toFixed(2)}%
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
