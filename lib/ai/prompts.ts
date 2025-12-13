import type { TokenInfo, TokenLiquidity, RugAnalysis, WalletInfo, WalletTransaction } from "@/lib/types"

export function buildAnalysisPrompt(
  query: string,
  data: {
    token?: TokenInfo
    liquidity?: TokenLiquidity
    rugAnalysis?: RugAnalysis
    relatedWallets?: WalletInfo[]
    recentTransactions?: WalletTransaction[]
  },
): string {
  const sections: string[] = []

  sections.push(`USER QUERY: "${query}"`)
  sections.push("")
  sections.push("=== STRUCTURED ON-CHAIN DATA ===")

  if (data.token) {
    sections.push(`
TOKEN DATA:
- Symbol: ${data.token.symbol}
- Name: ${data.token.name}
- Chain: ${data.token.chain}
- Address: ${data.token.address}
- Price: $${data.token.price}
- 24h Change: ${data.token.priceChange24h}%
- 24h Volume: $${data.token.volume24h.toLocaleString()}
- Market Cap: $${data.token.marketCap.toLocaleString()}
- Holders: ${data.token.holders.toLocaleString()}
- Created: ${data.token.createdAt}
`)
  }

  if (data.liquidity) {
    sections.push(`
LIQUIDITY DATA:
- DEX: ${data.liquidity.dex}
- Pair: ${data.liquidity.baseToken}/${data.liquidity.quoteToken}
- Total Liquidity: $${data.liquidity.liquidityUsd.toLocaleString()}
- 24h Liquidity Change: ${data.liquidity.liquidityChange24h}%
- LP Holder Distribution:
${data.liquidity.lpHolders
  .map(
    (h) =>
      `  * ${h.address.slice(0, 8)}...${h.address.slice(-4)}: ${h.percentage}%${h.label ? ` (${h.label})` : ""}${h.isContract ? " [CONTRACT]" : ""}`,
  )
  .join("\n")}
`)
  }

  if (data.rugAnalysis) {
    sections.push(`
RUG DETECTION ANALYSIS:
- Overall Risk Score: ${data.rugAnalysis.overallRiskScore}/100
- Rug Probability: ${(data.rugAnalysis.rugProbability * 100).toFixed(1)}%
- Analysis Confidence: ${(data.rugAnalysis.confidence * 100).toFixed(1)}%
- Risk Factors:
${data.rugAnalysis.riskFactors
  .map((f) => `  * [${f.severity.toUpperCase()}] ${f.name}: ${f.description} (score: ${f.score})`)
  .join("\n")}
- Warnings: ${data.rugAnalysis.warnings.length > 0 ? data.rugAnalysis.warnings.join("; ") : "None"}
`)
  }

  if (data.relatedWallets && data.relatedWallets.length > 0) {
    sections.push(`
KEY WALLETS:
${data.relatedWallets
  .map(
    (w) => `- ${w.address.slice(0, 8)}...${w.address.slice(-4)}${w.label ? ` (${w.label})` : ""}
  Value: $${w.totalValueUsd.toLocaleString()} | Tokens: ${w.tokenCount} | TX Count: ${w.txCount}
  ${w.isWhale ? "[WHALE]" : ""}`,
  )
  .join("\n")}
`)
  }

  if (data.recentTransactions && data.recentTransactions.length > 0) {
    sections.push(`
RECENT TRANSACTIONS:
${data.recentTransactions
  .slice(0, 5)
  .map(
    (tx) => `- ${tx.type.toUpperCase()} | $${tx.valueUsd.toLocaleString()} | ${tx.timestamp}
  From: ${tx.from.slice(0, 8)}... To: ${tx.to.slice(0, 8)}...
  ${tx.tokenIn ? `In: ${tx.tokenIn.amount} ${tx.tokenIn.symbol}` : ""} ${tx.tokenOut ? `Out: ${tx.tokenOut.amount} ${tx.tokenOut.symbol}` : ""}`,
  )
  .join("\n")}
`)
  }

  sections.push(`
=== ANALYSIS INSTRUCTIONS ===
Based on the structured on-chain data above, provide a comprehensive analysis answering the user's query.
Your response must be:
1. Factual and based ONLY on the provided data
2. Include specific numbers and addresses from the data
3. Classify risk factors appropriately
4. Provide actionable recommendations
5. Be explicit about confidence levels

If the data suggests high risk (score > 70), emphasize warnings prominently.
If asking about whale activity, focus on the wallet data and transactions.
If asking about safety/rug risk, prioritize the rug analysis data.
`)

  return sections.join("\n")
}

export const SYSTEM_PROMPT = `You are OnchainIQ, an advanced AI analyst specializing in Solana and BNB Chain cryptocurrency intelligence.

Your role is to analyze on-chain data and provide actionable insights. You:
- Only make claims supported by the provided data
- Are explicit about confidence levels and data limitations
- Prioritize user safety - always warn about high-risk tokens
- Provide structured, deterministic responses
- Never speculate without data backing

When analyzing tokens:
- Check liquidity depth and LP distribution
- Look for concentrated ownership (rug risk)
- Identify wash trading patterns
- Flag unusual contract permissions

When analyzing wallets:
- Classify as whale/insider/retail based on holdings and behavior
- Track accumulation/distribution patterns
- Note any connections to known entities

Response style:
- Professional and direct
- Lead with the most important findings
- Use specific numbers and percentages
- Include risk scores and confidence levels
- End with clear recommendations`
