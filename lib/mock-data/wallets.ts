import type { WalletInfo, WalletHolding, WalletTransaction } from "@/lib/types"

export const mockWhaleWallets: WalletInfo[] = [
  {
    address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    chain: "solana",
    label: "Alameda Research Remnant",
    isWhale: true,
    totalValueUsd: 125000000,
    tokenCount: 45,
    nftCount: 12,
    firstTxAt: "2021-03-15T00:00:00Z",
    lastTxAt: new Date().toISOString(),
    txCount: 15678,
  },
  {
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    chain: "solana",
    label: "Jump Trading",
    isWhale: true,
    totalValueUsd: 89000000,
    tokenCount: 23,
    nftCount: 0,
    firstTxAt: "2021-06-20T00:00:00Z",
    lastTxAt: new Date().toISOString(),
    txCount: 8934,
  },
  {
    address: "0x28C6c06298d514Db089934071355E5743bf21d60",
    chain: "bnb",
    label: "Binance Hot Wallet",
    isWhale: true,
    totalValueUsd: 2500000000,
    tokenCount: 156,
    nftCount: 0,
    firstTxAt: "2020-09-01T00:00:00Z",
    lastTxAt: new Date().toISOString(),
    txCount: 2345678,
  },
  {
    address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    chain: "solana",
    label: "Suspected Insider",
    isWhale: true,
    totalValueUsd: 34000000,
    tokenCount: 8,
    nftCount: 0,
    firstTxAt: "2024-01-15T00:00:00Z",
    lastTxAt: new Date().toISOString(),
    txCount: 456,
  },
]

export const mockWalletHoldings: Record<string, WalletHolding[]> = {
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1": [
    {
      tokenAddress: "So11111111111111111111111111111111111111112",
      tokenSymbol: "SOL",
      tokenName: "Solana",
      balance: "450000000000000",
      valueUsd: 98550000,
      percentage: 78.8,
      avgBuyPrice: 45.5,
      pnl: 58500000,
      pnlPercentage: 145.6,
    },
    {
      tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      tokenSymbol: "BONK",
      tokenName: "Bonk",
      balance: "500000000000000000",
      valueUsd: 16225000,
      percentage: 13.0,
      avgBuyPrice: 0.00001,
      pnl: 11225000,
      pnlPercentage: 224.5,
    },
    {
      tokenAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      tokenSymbol: "JUP",
      tokenName: "Jupiter",
      balance: "8225000000000",
      valueUsd: 10199000,
      percentage: 8.2,
      avgBuyPrice: 0.85,
      pnl: 3209000,
      pnlPercentage: 45.9,
    },
  ],
}

export const mockTransactions: WalletTransaction[] = [
  {
    hash: "5K8T...x9Yz",
    chain: "solana",
    type: "swap",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    from: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    to: "Raydium AMM",
    tokenIn: {
      address: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      amount: "50000000000",
      valueUsd: 10950,
    },
    tokenOut: {
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      symbol: "BONK",
      amount: "337500000000000",
      valueUsd: 10950,
    },
    valueUsd: 10950,
    fee: 0.000005,
  },
  {
    hash: "8Jk2...m4Np",
    chain: "solana",
    type: "transfer",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    from: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    to: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    tokenIn: {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      amount: "5000000000000",
      valueUsd: 5000000,
    },
    valueUsd: 5000000,
    fee: 0.000005,
  },
  {
    hash: "3Lm9...q7Rt",
    chain: "solana",
    type: "lp_remove",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    from: "DeployerScam1111111111111111111111111111111",
    to: "ScamPair1111111111111111111111111111111111",
    tokenIn: {
      address: "ScamLP111111111111111111111111111111111111",
      symbol: "SCAM-LP",
      amount: "500000000",
      valueUsd: 4500,
    },
    tokenOut: {
      address: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      amount: "20000000000",
      valueUsd: 4380,
    },
    valueUsd: 4500,
    fee: 0.000005,
  },
  {
    hash: "9Xv4...k2Bw",
    chain: "bnb",
    type: "swap",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    from: "0x28C6c06298d514Db089934071355E5743bf21d60",
    to: "PancakeSwap",
    tokenIn: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      symbol: "WBNB",
      amount: "10000000000000000000000",
      valueUsd: 6200000,
    },
    tokenOut: {
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      symbol: "CAKE",
      amount: "2530612000000000000000000",
      valueUsd: 6200000,
    },
    valueUsd: 6200000,
    fee: 0.001,
  },
]

export function getWalletByAddress(address: string): WalletInfo | undefined {
  return mockWhaleWallets.find((w) => w.address === address)
}

export function getWalletHoldings(address: string): WalletHolding[] {
  return mockWalletHoldings[address] || []
}

export function getRecentTransactions(limit = 10): WalletTransaction[] {
  return mockTransactions.slice(0, limit)
}

export function getWhaleWallets(chain?: string): WalletInfo[] {
  if (chain) {
    return mockWhaleWallets.filter((w) => w.chain === chain)
  }
  return mockWhaleWallets
}
