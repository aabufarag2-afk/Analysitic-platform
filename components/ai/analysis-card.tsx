"use client"

import { experimental_useObject as useObject } from "@ai-sdk/react"
import { useState } from "react"
import { aiAnalysisResponseSchema, type AIAnalysisResponse } from "@/lib/ai/schemas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wallet,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalysisCardProps {
  defaultToken?: string
  chain?: "solana" | "bnb"
}

export function AnalysisCard({ defaultToken, chain = "solana" }: AnalysisCardProps) {
  const [tokenAddress, setTokenAddress] = useState(defaultToken || "")
  const [query, setQuery] = useState("")

  const { object, submit, isLoading, error } = useObject({
    api: "/api/ai/analyze",
    schema: aiAnalysisResponseSchema,
  })

  const handleAnalyze = () => {
    if (!tokenAddress && !query) return
    submit({
      query: query || `Analyze this token for safety and whale activity`,
      context: {
        tokenAddress: tokenAddress || undefined,
        chain,
      },
    })
  }

  const analysis = object as AIAnalysisResponse | undefined

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          AI Token Analysis
        </CardTitle>
        <CardDescription>
          Get structured intelligence on any token with rug detection and whale tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Section */}
        <div className="space-y-3">
          <Input
            placeholder="Token address (e.g., DezXAZ...)"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="bg-secondary"
          />
          <Input
            placeholder="Or ask a specific question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-secondary"
          />
          <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              "Analyze Token"
            )}
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">Error: {error.message}</div>
        )}

        {/* Results Section */}
        {analysis && (
          <div className="space-y-4 pt-4 border-t border-border">
            {/* Bias & Risk Overview */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-secondary text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {analysis.bias === "bullish" ? (
                    <TrendingUp className="h-4 w-4 text-chart-2" />
                  ) : analysis.bias === "bearish" ? (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Bias</p>
                <p
                  className={cn(
                    "font-semibold capitalize",
                    analysis.bias === "bullish" && "text-chart-2",
                    analysis.bias === "bearish" && "text-destructive",
                  )}
                >
                  {analysis.bias}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-secondary text-center">
                <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    analysis.riskScore < 30 && "text-chart-2",
                    analysis.riskScore >= 30 && analysis.riskScore < 70 && "text-chart-3",
                    analysis.riskScore >= 70 && "text-destructive",
                  )}
                >
                  {analysis.riskScore}
                </p>
                <Progress value={analysis.riskScore} className="h-1 mt-1" />
              </div>

              <div className="p-3 rounded-lg bg-secondary text-center">
                <p className="text-xs text-muted-foreground mb-1">Rug Prob.</p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    analysis.rugProbability < 0.3 && "text-chart-2",
                    analysis.rugProbability >= 0.3 && analysis.rugProbability < 0.7 && "text-chart-3",
                    analysis.rugProbability >= 0.7 && "text-destructive",
                  )}
                >
                  {(analysis.rugProbability * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-3 rounded-lg bg-secondary">
              <p className="text-sm leading-relaxed">{analysis.explanation}</p>
            </div>

            {/* Key Factors */}
            {analysis.factors && analysis.factors.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Key Factors</p>
                <div className="space-y-2">
                  {analysis.factors.map((factor, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-secondary/50">
                      {factor.impact === "positive" ? (
                        <CheckCircle className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                      ) : factor.impact === "negative" ? (
                        <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{factor.name}</p>
                        <p className="text-xs text-muted-foreground">{factor.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Wallets */}
            {analysis.keyWallets && analysis.keyWallets.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Key Wallets</p>
                <div className="space-y-2">
                  {analysis.keyWallets.slice(0, 3).map((wallet, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-mono">
                            {wallet.address.slice(0, 8)}...{wallet.address.slice(-4)}
                          </p>
                          {wallet.label && <p className="text-xs text-muted-foreground">{wallet.label}</p>}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {wallet.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="p-3 rounded-lg border border-chart-3/30 bg-chart-3/5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-chart-3" />
                  <p className="text-sm font-medium">Recommendations</p>
                </div>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confidence Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
              <span>Confidence: {(analysis.confidence * 100).toFixed(0)}%</span>
              <span>Based on on-chain data</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
