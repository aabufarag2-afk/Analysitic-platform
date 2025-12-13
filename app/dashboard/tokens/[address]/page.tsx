import { notFound } from "next/navigation"
import { getTokenByAddress, getLiquidityByToken, getRugAnalysis } from "@/lib/mock-data/tokens"
import { TokenHeader } from "@/components/tokens/token-header"
import { TokenStats } from "@/components/tokens/token-stats"
import { LiquidityPanel } from "@/components/tokens/liquidity-panel"
import { RugScoreCard } from "@/components/tokens/rug-score-card"
import { RiskFactorsCard } from "@/components/tokens/risk-factors-card"
import { HoldersDistribution } from "@/components/tokens/holders-distribution"
import { TokenPriceChart } from "@/components/tokens/token-price-chart"

interface TokenPageProps {
  params: Promise<{ address: string }>
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { address } = await params
  const token = getTokenByAddress(address)

  if (!token) {
    notFound()
  }

  const liquidity = getLiquidityByToken(address)
  const rugAnalysis = getRugAnalysis(address)

  return (
    <div className="p-6 space-y-6">
      <TokenHeader token={token} />

      <TokenStats token={token} liquidity={liquidity} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TokenPriceChart token={token} />
        </div>
        <div>
          <RugScoreCard analysis={rugAnalysis} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiquidityPanel liquidity={liquidity} />
        <RiskFactorsCard analysis={rugAnalysis} />
      </div>

      {liquidity && <HoldersDistribution liquidity={liquidity} />}
    </div>
  )
}
