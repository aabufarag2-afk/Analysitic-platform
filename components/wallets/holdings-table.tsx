"use client"

import type { WalletHolding } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

interface HoldingsTableProps {
  holdings: WalletHolding[]
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  if (holdings.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Holdings
          </CardTitle>
          <CardDescription>No holdings data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">This wallet's holdings are not tracked.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Holdings
        </CardTitle>
        <CardDescription>{holdings.length} tokens held</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">% of Portfolio</TableHead>
              <TableHead className="text-right">Avg Buy</TableHead>
              <TableHead className="text-right">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((holding) => (
              <TableRow key={holding.tokenAddress} className="hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-xs font-semibold">{holding.tokenSymbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{holding.tokenSymbol}</p>
                      <p className="text-sm text-muted-foreground">{holding.tokenName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <p className="font-mono">${(holding.valueUsd / 1e6).toFixed(2)}M</p>
                  <p className="text-xs text-muted-foreground font-mono">{Number(holding.balance).toExponential(2)}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Progress value={holding.percentage} className="h-2 w-16" />
                    <span className="text-sm font-mono w-12">{holding.percentage.toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {holding.avgBuyPrice ? `$${holding.avgBuyPrice.toFixed(4)}` : "-"}
                </TableCell>
                <TableCell className="text-right">
                  {holding.pnl !== undefined && holding.pnlPercentage !== undefined ? (
                    <div
                      className={cn("flex flex-col items-end", holding.pnl >= 0 ? "text-chart-2" : "text-destructive")}
                    >
                      <div className="flex items-center gap-1">
                        {holding.pnl >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="font-mono">
                          {holding.pnl >= 0 ? "+" : ""}${(holding.pnl / 1e6).toFixed(2)}M
                        </span>
                      </div>
                      <span className="text-xs">
                        {holding.pnlPercentage >= 0 ? "+" : ""}
                        {holding.pnlPercentage.toFixed(1)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
