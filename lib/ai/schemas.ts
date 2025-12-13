import { z } from "zod"

// Schema for AI analysis response - structured, deterministic output
export const aiAnalysisResponseSchema = z.object({
  bias: z.enum(["bullish", "bearish", "neutral"]).describe("Overall market sentiment for the queried asset"),
  confidence: z.number().min(0).max(1).describe("Confidence level in the analysis (0-1)"),
  riskScore: z.number().min(0).max(100).describe("Overall risk score (0-100, higher = more risky)"),
  rugProbability: z.number().min(0).max(1).describe("Probability of rug pull (0-1)"),
  keyWallets: z
    .array(
      z.object({
        address: z.string().describe("Wallet address"),
        label: z.string().optional().describe("Known label for wallet"),
        role: z.enum(["whale", "insider", "deployer", "market_maker", "retail"]).describe("Wallet classification"),
        influence: z.number().min(0).max(1).describe("Influence on token price (0-1)"),
        recentActivity: z.string().describe("Summary of recent activity"),
      }),
    )
    .describe("Key wallets affecting the token"),
  flows: z
    .array(
      z.object({
        from: z.string().describe("Source address"),
        to: z.string().describe("Destination address"),
        amount: z.string().describe("Token amount"),
        valueUsd: z.number().describe("USD value"),
        timestamp: z.string().describe("ISO timestamp"),
        type: z.enum(["accumulation", "distribution", "wash", "normal"]).describe("Flow classification"),
      }),
    )
    .describe("Significant token flows"),
  explanation: z.string().describe("Human-readable explanation of the analysis"),
  factors: z
    .array(
      z.object({
        name: z.string().describe("Factor name"),
        impact: z.enum(["positive", "negative", "neutral"]).describe("Impact direction"),
        weight: z.number().min(0).max(1).describe("Importance weight"),
        explanation: z.string().describe("Factor explanation"),
      }),
    )
    .describe("Factors contributing to the analysis"),
  recommendations: z.array(z.string()).describe("Actionable recommendations"),
})

export type AIAnalysisResponse = z.infer<typeof aiAnalysisResponseSchema>

// Schema for quick safety check
export const safetyCheckSchema = z.object({
  isSafe: z.boolean().describe("Whether the token appears safe"),
  riskLevel: z.enum(["low", "medium", "high", "critical"]).describe("Risk classification"),
  mainConcerns: z.array(z.string()).describe("Primary concerns if any"),
  summary: z.string().describe("Brief safety summary"),
})

export type SafetyCheck = z.infer<typeof safetyCheckSchema>

// Schema for whale activity summary
export const whaleActivitySchema = z.object({
  isAccumulating: z.boolean().describe("Whether whales are accumulating"),
  netFlow: z.enum(["inflow", "outflow", "neutral"]).describe("Net flow direction"),
  topWhales: z
    .array(
      z.object({
        address: z.string(),
        action: z.enum(["buying", "selling", "holding"]),
        amount: z.string(),
        timeframe: z.string(),
      }),
    )
    .describe("Top whale activities"),
  summary: z.string().describe("Whale activity summary"),
})

export type WhaleActivity = z.infer<typeof whaleActivitySchema>
