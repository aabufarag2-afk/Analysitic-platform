"use client"

import { useState } from "react"
import { ChainSelector } from "@/components/dashboard/chain-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDEXPools, mockDEXTrades } from "@/lib/mock-data/market"
import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

export default function DEXPage() {
  const [selectedChain, setSelectedChain] = useState<"all" | "solana" | "bnb">("all")

  const filteredPools = selectedChain === "all" ? mockDEXPools : mockDEXPools.filter((p) => p.chain === selectedChain)

  const filteredTrades =
    selectedChain === "all" ? mockDEXTrades : mockDEXTrades.filter((t) => t.chain === selectedChain)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">DEX Analytics</h1>
          <p className="text-muted-foreground">Liquidity pools and trading activity across Raydium and PancakeSwap</p>
        </div>
        <ChainSelector selected={selectedChain} onChange={setSelectedChain} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Liquidity</p>
            <p className="text-2xl font-bold">
              ${(filteredPools.reduce((acc, p) => acc + p.liquidityUsd, 0) / 1e6).toFixed(2)}M
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-2xl font-bold">
              ${(filteredPools.reduce((acc, p) => acc + p.volume24h, 0) / 1e6).toFixed(2)}M
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">24h Fees</p>
            <p className="text-2xl font-bold">
              ${(filteredPools.reduce((acc, p) => acc + p.fees24h, 0) / 1e3).toFixed(1)}K
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Pools</p>
            <p className="text-2xl font-bold">{filteredPools.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pools Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Liquidity Pools
          </CardTitle>
          <CardDescription>Top pools by total value locked</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pool</TableHead>
                <TableHead>DEX</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead className="text-right">TVL</TableHead>
                <TableHead className="text-right">24h Volume</TableHead>
                <TableHead className="text-right">24h Fees</TableHead>
                <TableHead className="text-right">APY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPools.map((pool) => (
                <TableRow key={pool.address} className="hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-background">
                          {pool.token0.symbol.slice(0, 2)}
                        </div>
                        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-background">
                          {pool.token1.symbol.slice(0, 2)}
                        </div>
                      </div>
                      <span className="font-medium">
                        {pool.token0.symbol}/{pool.token1.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{pool.dex}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {pool.chain.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${(pool.liquidityUsd / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="text-right font-mono">${(pool.volume24h / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="text-right font-mono">${(pool.fees24h / 1e3).toFixed(2)}K</TableCell>
                  <TableCell className="text-right">
                    <span className="text-chart-2 font-medium">{pool.apy.toFixed(1)}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Trades
          </CardTitle>
          <CardDescription>Latest swaps across DEXs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTrades.map((trade) => (
              <div
                key={trade.hash}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    trade.type === "buy" ? "bg-chart-2/10" : "bg-destructive/10",
                  )}
                >
                  {trade.type === "buy" ? (
                    <ArrowUpRight className="h-5 w-5 text-chart-2" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">{trade.type}</span>
                    <span className="text-muted-foreground">{trade.tokenOut.symbol}</span>
                    <Badge variant="outline" className="text-xs">
                      {trade.dex}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {trade.tokenIn.amount.slice(0, 8)} {trade.tokenIn.symbol} → {trade.tokenOut.amount.slice(0, 8)}{" "}
                    {trade.tokenOut.symbol}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono">${trade.tokenOut.valueUsd.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(trade.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
