"use client"

import { useState } from "react"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { WhaleActivity } from "@/components/dashboard/whale-activity"
import { TrendingTokens } from "@/components/dashboard/trending-tokens"
import { ChainSelector } from "@/components/dashboard/chain-selector"
import { AnalysisCard } from "@/components/ai/analysis-card"

export default function DashboardPage() {
  const [selectedChain, setSelectedChain] = useState<"all" | "solana" | "bnb">("all")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Real-time blockchain intelligence for Solana and BNB Chain</p>
        </div>
        <ChainSelector selected={selectedChain} onChange={setSelectedChain} />
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WhaleActivity />
        </div>
        <div>
          <TrendingTokens />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisCard defaultToken="DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" chain="solana" />
        <AnalysisCard defaultToken="RUGpull111111111111111111111111111111111111" chain="solana" />
      </div>
    </div>
  )
}
