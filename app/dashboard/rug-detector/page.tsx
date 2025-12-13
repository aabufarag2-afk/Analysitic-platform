"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Droplets,
  Users,
  Code,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getRugAnalysis, getTokenByAddress } from "@/lib/mock-data/tokens"
import type { RugAnalysis, TokenInfo } from "@/lib/types"

const categoryIcons = {
  liquidity: Droplets,
  ownership: Users,
  contract: Code,
  trading: BarChart3,
  social: Shield,
}

export default function RugDetectorPage() {
  const [address, setAddress] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{ token?: TokenInfo; analysis?: RugAnalysis } | null>(null)

  const handleAnalyze = async () => {
    if (!address) return

    setIsAnalyzing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const token = getTokenByAddress(address)
    const analysis = getRugAnalysis(address)

    setResult({ token, analysis })
    setIsAnalyzing(false)
  }

  const quickScan = (addr: string) => {
    setAddress(addr)
    setTimeout(() => {
      const token = getTokenByAddress(addr)
      const analysis = getRugAnalysis(addr)
      setResult({ token, analysis })
    }, 500)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rug Detector</h1>
        <p className="text-muted-foreground">Analyze any token for rug pull risks using on-chain data</p>
      </div>

      {/* Search Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Token Analysis
          </CardTitle>
          <CardDescription>Enter a token address to scan for potential rug pull indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter token address (e.g., DezXAZ8z7...)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-9 bg-secondary"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
            </div>
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !address}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </div>

          {/* Quick Scan Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick scan:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickScan("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263")}
            >
              BONK (Safe)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickScan("RUGpull111111111111111111111111111111111111")}
            >
              SCAM (High Risk)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Score */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              {result.analysis ? (
                <div className="text-center">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center h-32 w-32 rounded-full mb-4",
                      result.analysis.overallRiskScore < 30 && "bg-chart-2/10",
                      result.analysis.overallRiskScore >= 30 &&
                        result.analysis.overallRiskScore < 70 &&
                        "bg-chart-3/10",
                      result.analysis.overallRiskScore >= 70 && "bg-destructive/10",
                    )}
                  >
                    <div>
                      <p
                        className={cn(
                          "text-5xl font-bold",
                          result.analysis.overallRiskScore < 30 && "text-chart-2",
                          result.analysis.overallRiskScore >= 30 &&
                            result.analysis.overallRiskScore < 70 &&
                            "text-chart-3",
                          result.analysis.overallRiskScore >= 70 && "text-destructive",
                        )}
                      >
                        {result.analysis.overallRiskScore}
                      </p>
                      <p className="text-sm text-muted-foreground">/100</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{result.token?.symbol || "Unknown Token"}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      result.analysis.overallRiskScore < 30 && "bg-chart-2/10 text-chart-2 border-chart-2/30",
                      result.analysis.overallRiskScore >= 30 &&
                        result.analysis.overallRiskScore < 70 &&
                        "bg-chart-3/10 text-chart-3 border-chart-3/30",
                      result.analysis.overallRiskScore >= 70 &&
                        "bg-destructive/10 text-destructive border-destructive/30",
                    )}
                  >
                    {result.analysis.overallRiskScore < 30 && "Low Risk"}
                    {result.analysis.overallRiskScore >= 30 && result.analysis.overallRiskScore < 70 && "Medium Risk"}
                    {result.analysis.overallRiskScore >= 70 && "High Risk"}
                  </Badge>

                  <div className="mt-6 space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Rug Probability</span>
                        <span className="font-medium">{(result.analysis.rugProbability * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={result.analysis.rugProbability * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium">{(result.analysis.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={result.analysis.confidence * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No analysis data available</p>
                  <p className="text-sm text-muted-foreground">This token has not been analyzed yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>Detailed breakdown of risk factors</CardDescription>
            </CardHeader>
            <CardContent>
              {result.analysis ? (
                <div className="space-y-4">
                  {result.analysis.riskFactors.map((factor, i) => {
                    const Icon = categoryIcons[factor.category]
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                            factor.severity === "low" && "bg-chart-2/10",
                            factor.severity === "medium" && "bg-chart-3/10",
                            factor.severity === "high" && "bg-destructive/10",
                            factor.severity === "critical" && "bg-destructive/20",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5",
                              factor.severity === "low" && "text-chart-2",
                              factor.severity === "medium" && "text-chart-3",
                              factor.severity === "high" && "text-destructive",
                              factor.severity === "critical" && "text-destructive",
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{factor.name}</h4>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                factor.severity === "low" && "text-chart-2 border-chart-2/30",
                                factor.severity === "medium" && "text-chart-3 border-chart-3/30",
                                factor.severity === "high" && "text-destructive border-destructive/30",
                                factor.severity === "critical" && "text-destructive border-destructive/50",
                              )}
                            >
                              {factor.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{factor.description}</p>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={factor.score}
                              className={cn(
                                "h-1.5 flex-1",
                                factor.score > 70 && "[&>div]:bg-destructive",
                                factor.score > 30 && factor.score <= 70 && "[&>div]:bg-chart-3",
                                factor.score <= 30 && "[&>div]:bg-chart-2",
                              )}
                            />
                            <span className="text-xs font-mono text-muted-foreground w-8">{factor.score}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Warnings & Recommendations */}
                  {result.analysis.warnings.length > 0 && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <h4 className="font-medium text-destructive">Warnings</h4>
                      </div>
                      <ul className="space-y-1">
                        {result.analysis.warnings.map((warning, i) => (
                          <li key={i} className="text-sm text-destructive/80 flex items-start gap-2">
                            <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.analysis.recommendations.length > 0 && (
                    <div
                      className={cn(
                        "p-4 rounded-lg border",
                        result.analysis.overallRiskScore >= 70
                          ? "bg-destructive/10 border-destructive/30"
                          : "bg-chart-2/10 border-chart-2/30",
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle
                          className={cn(
                            "h-4 w-4",
                            result.analysis.overallRiskScore >= 70 ? "text-destructive" : "text-chart-2",
                          )}
                        />
                        <h4
                          className={cn(
                            "font-medium",
                            result.analysis.overallRiskScore >= 70 ? "text-destructive" : "text-chart-2",
                          )}
                        >
                          Recommendations
                        </h4>
                      </div>
                      <ul className="space-y-1">
                        {result.analysis.recommendations.map((rec, i) => (
                          <li
                            key={i}
                            className={cn(
                              "text-sm flex items-start gap-2",
                              result.analysis && result.analysis.overallRiskScore >= 70
                                ? "text-destructive/80"
                                : "text-chart-2/80",
                            )}
                          >
                            <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Enter a token address to see risk analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">LP Analysis</h3>
                <p className="text-sm text-muted-foreground">Ownership & lock status</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Contract Check</h3>
                <p className="text-sm text-muted-foreground">Mint & freeze authority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Trade Analysis</h3>
                <p className="text-sm text-muted-foreground">Wash trading detection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
