"use client"

import type { TokenInfo } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

interface TokenPriceChartProps {
  token: TokenInfo
}

// Generate mock price data
function generatePriceData(basePrice: number, days: number) {
  const data = []
  let price = basePrice * 0.8
  const now = Date.now()

  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.48) * 0.1
    price = price * (1 + change)
    data.push({
      date: new Date(now - i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: price,
    })
  }

  // Ensure last price matches current price
  data[data.length - 1].price = basePrice
  return data
}

export function TokenPriceChart({ token }: TokenPriceChartProps) {
  const [timeframe, setTimeframe] = useState<"1D" | "7D" | "30D" | "90D">("7D")

  const timeframeDays = {
    "1D": 1,
    "7D": 7,
    "30D": 30,
    "90D": 90,
  }

  const data = generatePriceData(token.price, timeframeDays[timeframe])
  const minPrice = Math.min(...data.map((d) => d.price))
  const maxPrice = Math.max(...data.map((d) => d.price))
  const priceChange = ((data[data.length - 1].price - data[0].price) / data[0].price) * 100
  const isPositive = priceChange >= 0

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Price Chart</CardTitle>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {(["1D", "7D", "30D", "90D"] as const).map((tf) => (
            <Button
              key={tf}
              variant="ghost"
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={cn(
                "h-7 px-3 text-xs",
                timeframe === tf && "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? "oklch(0.65 0.2 145)" : "oklch(0.55 0.22 25)"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositive ? "oklch(0.65 0.2 145)" : "oklch(0.55 0.22 25)"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 260)" vertical={false} />
              <XAxis dataKey="date" stroke="oklch(0.65 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="oklch(0.65 0.02 260)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[minPrice * 0.95, maxPrice * 1.05]}
                tickFormatter={(value) => `$${value < 0.01 ? value.toExponential(1) : value.toFixed(2)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "oklch(0.95 0.01 260)" }}
                formatter={(value: number) => [`$${value.toFixed(6)}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "oklch(0.65 0.2 145)" : "oklch(0.55 0.22 25)"}
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-muted-foreground">{timeframe} Change</span>
          <span className={cn("font-medium", isPositive ? "text-chart-2" : "text-destructive")}>
            {isPositive ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
