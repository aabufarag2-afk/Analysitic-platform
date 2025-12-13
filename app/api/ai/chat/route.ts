import { streamText, convertToModelMessages, type UIMessage, consumeStream } from "ai"
import { SYSTEM_PROMPT } from "@/lib/ai/prompts"
import { mockTokens } from "@/lib/mock-data/tokens"
import { mockWhaleWallets } from "@/lib/mock-data/wallets"
import { mockMarketOverview } from "@/lib/mock-data/market"

export const maxDuration = 60

// Build context summary for the AI
function buildContextSummary(): string {
  const solanaOverview = mockMarketOverview.solana
  const bnbOverview = mockMarketOverview.bnb

  return `
CURRENT MARKET CONTEXT:

SOLANA:
- TVL: $${(solanaOverview.totalValueLocked / 1e9).toFixed(2)}B
- 24h Volume: $${(solanaOverview.volume24h / 1e9).toFixed(2)}B
- Active Wallets: ${(solanaOverview.activeWallets24h / 1e6).toFixed(2)}M

BNB CHAIN:
- TVL: $${(bnbOverview.totalValueLocked / 1e9).toFixed(2)}B
- 24h Volume: $${(bnbOverview.volume24h / 1e6).toFixed(0)}M
- Active Wallets: ${(bnbOverview.activeWallets24h / 1e3).toFixed(0)}K

TRACKED TOKENS:
${mockTokens.map((t) => `- ${t.symbol} (${t.chain}): $${t.price} (${t.priceChange24h > 0 ? "+" : ""}${t.priceChange24h}%)`).join("\n")}

KNOWN WHALE WALLETS:
${mockWhaleWallets.map((w) => `- ${w.label || w.address.slice(0, 12)}... ($${(w.totalValueUsd / 1e6).toFixed(1)}M)`).join("\n")}

Available commands you can help with:
- Analyze any token by address or symbol
- Check wallet holdings and activity
- Get rug detection scores
- Track whale movements
- Compare DEX liquidity
`
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const contextSummary = buildContextSummary()
  const enhancedSystem = `${SYSTEM_PROMPT}\n\n${contextSummary}`

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "anthropic/claude-sonnet-4-20250514",
    system: enhancedSystem,
    prompt,
    abortSignal: req.signal,
    maxTokens: 2000,
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
