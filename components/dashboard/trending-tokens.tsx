"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTokens } from "@/lib/mock-data/tokens"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function TrendingTokens() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Trending Tokens</CardTitle>
        <CardDescription>Most active tokens in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mockTokens.slice(0, 5).map((token, index) => (
            <Link
              key={token.address}
              href={`/dashboard/tokens/${token.address}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="text-sm text-muted-foreground w-5">{index + 1}</span>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs font-semibold">{token.symbol.slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{token.symbol}</span>
                  <Badge variant="outline" className="text-xs">
                    {token.chain.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{token.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${token.price.toLocaleString()}</p>
                <div
                  className={cn(
                    "flex items-center justify-end gap-1 text-sm",
                    token.priceChange24h >= 0 ? "text-chart-2" : "text-destructive",
                  )}
                >
                  {token.priceChange24h >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {token.priceChange24h > 0 ? "+" : ""}
                  {token.priceChange24h.toFixed(2)}%
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
