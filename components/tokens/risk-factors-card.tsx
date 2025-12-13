import type { RugAnalysis } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Droplets, Users, Code, BarChart3, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface RiskFactorsCardProps {
  analysis?: RugAnalysis
}

const categoryIcons = {
  liquidity: Droplets,
  ownership: Users,
  contract: Code,
  trading: BarChart3,
  social: Share2,
}

const severityColors = {
  low: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  medium: "bg-chart-3/10 text-chart-3 border-chart-3/30",
  high: "bg-destructive/10 text-destructive border-destructive/30",
  critical: "bg-destructive/20 text-destructive border-destructive/50",
}

export function RiskFactorsCard({ analysis }: RiskFactorsCardProps) {
  if (!analysis) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Factors
          </CardTitle>
          <CardDescription>No analysis available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Risk factors will appear here after analysis.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Risk Factors
        </CardTitle>
        <CardDescription>{analysis.riskFactors.length} factors analyzed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysis.riskFactors.map((factor, i) => {
            const Icon = categoryIcons[factor.category]
            return (
              <div key={i} className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{factor.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{factor.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("text-xs", severityColors[factor.severity])}>
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
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
