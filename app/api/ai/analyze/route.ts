import { generateObject } from "ai"
import { aiAnalysisResponseSchema } from "@/lib/ai/schemas"
import { buildAnalysisPrompt, SYSTEM_PROMPT } from "@/lib/ai/prompts"
import { getTokenByAddress, getLiquidityByToken, getRugAnalysis } from "@/lib/mock-data/tokens"
import { getWhaleWallets, getRecentTransactions } from "@/lib/mock-data/wallets"
import type { Chain } from "@/lib/types"

export const maxDuration = 60

export async function POST(req: Request) {
  const { query, context } = await req.json()

  // Gather relevant data based on context
  const token = context?.tokenAddress ? getTokenByAddress(context.tokenAddress) : undefined
  const liquidity = context?.tokenAddress ? getLiquidityByToken(context.tokenAddress) : undefined
  const rugAnalysis = context?.tokenAddress ? getRugAnalysis(context.tokenAddress) : undefined
  const relatedWallets = getWhaleWallets(context?.chain as Chain)
  const recentTransactions = getRecentTransactions(10)

  // Build the analysis prompt with structured data
  const analysisPrompt = buildAnalysisPrompt(query, {
    token,
    liquidity,
    rugAnalysis,
    relatedWallets,
    recentTransactions,
  })

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: aiAnalysisResponseSchema,
    system: SYSTEM_PROMPT,
    prompt: analysisPrompt,
    maxOutputTokens: 4000,
  })

  return Response.json(object)
}
