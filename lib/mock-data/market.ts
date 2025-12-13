import type { MarketOverview, DEXPool, DEXTrade } from "@/lib/types"
import { mockTokens } from "./tokens"
import { mockTransactions } from "./wallets"

export const mockMarketOverview: Record<string, MarketOverview> = {
  solana: {
    chain: "solana",
    totalValueLocked: 8500000000,
    volume24h: 2100000000,
    transactions24h: 45678901,
    activeWallets24h: 1234567,
    topGainers: mockTokens.filter((t) => t.chain === "solana" && t.priceChange24h > 0).slice(0, 5),
    topLosers: mockTokens.filter((t) => t.chain === "solana" && t.priceChange24h < 0).slice(0, 5),
    trending: mockTokens.filter((t) => t.chain === "solana").slice(0, 5),
    whaleActivity: mockTransactions.filter((t) => t.chain === "solana"),
  },
  bnb: {
    chain: "bnb",
    totalValueLocked: 5200000000,
    volume24h: 890000000,
    transactions24h: 12345678,
    activeWallets24h: 567890,
    topGainers: mockTokens.filter((t) => t.chain === "bnb" && t.priceChange24h > 0).slice(0, 5),
    topLosers: mockTokens.filter((t) => t.chain === "bnb" && t.priceChange24h < 0).slice(0, 5),
    trending: mockTokens.filter((t) => t.chain === "bnb").slice(0, 5),
    whaleActivity: mockTransactions.filter((t) => t.chain === "bnb"),
  },
}

export const mockDEXPools: DEXPool[] = [
  {
    address: "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
    chain: "solana",
    dex: "Raydium",
    token0: mockTokens[0],
    token1: mockTokens[4],
    reserve0: "500000000000000000",
    reserve1: "16225000000",
    liquidityUsd: 32450000,
    volume24h: 12500000,
    fees24h: 37500,
    apy: 42.5,
  },
  {
    address: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
    chain: "bnb",
    dex: "PancakeSwap",
    token0: mockTokens[2],
    token1: mockTokens[4],
    reserve0: "12500000000000000000000000",
    reserve1: "30625000000",
    liquidityUsd: 61250000,
    volume24h: 8900000,
    fees24h: 22250,
    apy: 28.3,
  },
]

export const mockDEXTrades: DEXTrade[] = [
  {
    hash: "trade1...",
    chain: "solana",
    dex: "Raydium",
    pairAddress: "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
    type: "buy",
    tokenIn: {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      amount: "10000000000",
      valueUsd: 10000,
    },
    tokenOut: {
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      symbol: "BONK",
      amount: "308166409861",
      valueUsd: 10000,
    },
    trader: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    priceImpact: 0.02,
  },
  {
    hash: "trade2...",
    chain: "solana",
    dex: "Raydium",
    pairAddress: "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
    type: "sell",
    tokenIn: {
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      symbol: "BONK",
      amount: "1000000000000000",
      valueUsd: 32450,
    },
    tokenOut: {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      amount: "32450000000",
      valueUsd: 32450,
    },
    trader: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    priceImpact: 0.08,
  },
]

export function getMarketOverview(chain: string): MarketOverview | undefined {
  return mockMarketOverview[chain]
}

export function getDEXPools(chain?: string): DEXPool[] {
  if (chain) {
    return mockDEXPools.filter((p) => p.chain === chain)
  }
  return mockDEXPools
}

export function getRecentTrades(chain?: string, limit = 20): DEXTrade[] {
  const trades = chain ? mockDEXTrades.filter((t) => t.chain === chain) : mockDEXTrades
  return trades.slice(0, limit)
}
