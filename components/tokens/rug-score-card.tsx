import type { RugAnalysis } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react"
import { cn } from "@/lib/utils"

interface RugScoreCardProps {
  analysis?: RugAnalysis
}

export function RugScoreCard({ analysis }: RugScoreCardProps) {
  if (!analysis) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Rug Score
          </CardTitle>
          <CardDescription>No analysis available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Run an analysis to check this token's rug risk.</p>
        </CardContent>
      </Card>
    )
  }

  const getRiskLevel = (score: number) => {
    if (score < 30) return { label: "Low Risk", icon: ShieldCheck, color: "text-chart-2", bg: "bg-chart-2/10" }
    if (score < 60) return { label: "Medium Risk", icon: ShieldAlert, color: "text-chart-3", bg: "bg-chart-3/10" }
    if (score < 80) return { label: "High Risk", icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" }
    return { label: "Critical Risk", icon: ShieldX, color: "text-destructive", bg: "bg-destructive/10" }
  }

  const risk = getRiskLevel(analysis.overallRiskScore)
  const RiskIcon = risk.icon

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Rug Score
        </CardTitle>
        <CardDescription>AI-powered rug detection analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score */}
        <div className={cn("p-6 rounded-xl text-center", risk.bg)}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <RiskIcon className={cn("h-6 w-6", risk.color)} />
            <span className={cn("font-semibold", risk.color)}>{risk.label}</span>
          </div>
          <p className={cn("text-5xl font-bold", risk.color)}>{analysis.overallRiskScore}</p>
          <p className="text-sm text-muted-foreground mt-1">out of 100</p>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Rug Probability</span>
              <span className="font-medium">{(analysis.rugProbability * 100).toFixed(0)}%</span>
            </div>
            <Progress
              value={analysis.rugProbability * 100}
              className={cn(
                "h-2",
                analysis.rugProbability > 0.7 && "[&>div]:bg-destructive",
                analysis.rugProbability > 0.3 && analysis.rugProbability <= 0.7 && "[&>div]:bg-chart-3",
                analysis.rugProbability <= 0.3 && "[&>div]:bg-chart-2",
              )}
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Analysis Confidence</span>
              <span className="font-medium">{(analysis.confidence * 100).toFixed(0)}%</span>
            </div>
            <Progress value={analysis.confidence * 100} className="h-2" />
          </div>
        </div>

        {/* Warnings */}
        {analysis.warnings.length > 0 && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-sm font-medium text-destructive mb-2">Warnings</p>
            <ul className="space-y-1">
              {analysis.warnings.map((warning, i) => (
                <li key={i} className="text-xs text-destructive/80">
                  • {warning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations.length > 0 && analysis.overallRiskScore < 70 && (
          <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/30">
            <p className="text-sm font-medium text-chart-2 mb-2">Recommendations</p>
            <ul className="space-y-1">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-chart-2/80">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
