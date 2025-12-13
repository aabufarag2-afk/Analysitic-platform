import type { TokenInfo, TokenLiquidity, RugAnalysis } from "@/lib/types"

export const mockTokens: TokenInfo[] = [
  {
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    chain: "solana",
    symbol: "BONK",
    name: "Bonk",
    decimals: 5,
    totalSupply: "93526183799889893",
    circulatingSupply: "68420000000000000",
    price: 0.00003245,
    priceChange24h: 12.5,
    volume24h: 245000000,
    marketCap: 2220000000,
    holders: 892341,
    createdAt: "2022-12-25T00:00:00Z",
  },
  {
    address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    chain: "solana",
    symbol: "JUP",
    name: "Jupiter",
    decimals: 6,
    totalSupply: "10000000000000000",
    circulatingSupply: "1350000000000000",
    price: 1.24,
    priceChange24h: -3.2,
    volume24h: 89000000,
    marketCap: 1674000000,
    holders: 234521,
    createdAt: "2024-01-31T00:00:00Z",
  },
  {
    address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    chain: "bnb",
    symbol: "CAKE",
    name: "PancakeSwap",
    decimals: 18,
    totalSupply: "389954804000000000000000000",
    circulatingSupply: "283456789000000000000000000",
    price: 2.45,
    priceChange24h: 5.8,
    volume24h: 67000000,
    marketCap: 694368733,
    holders: 1456789,
    createdAt: "2020-09-25T00:00:00Z",
  },
  {
    address: "RUGpull111111111111111111111111111111111111",
    chain: "solana",
    symbol: "SCAM",
    name: "Definitely Not A Rug",
    decimals: 9,
    totalSupply: "1000000000000000000",
    circulatingSupply: "100000000000000000",
    price: 0.0000001,
    priceChange24h: -45.2,
    volume24h: 50000,
    marketCap: 10000,
    holders: 234,
    createdAt: "2024-12-01T00:00:00Z",
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    chain: "solana",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    totalSupply: "5000000000000000",
    circulatingSupply: "4800000000000000",
    price: 1.0,
    priceChange24h: 0.01,
    volume24h: 2500000000,
    marketCap: 4800000000,
    holders: 3456789,
    createdAt: "2020-01-01T00:00:00Z",
  },
]

export const mockLiquidity: TokenLiquidity[] = [
  {
    tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    chain: "solana",
    dex: "Raydium",
    pairAddress: "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
    baseToken: "BONK",
    quoteToken: "SOL",
    liquidityUsd: 45000000,
    liquidityChange24h: 2.3,
    lpTokenSupply: "12345678901234",
    lpHolders: [
      {
        address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
        balance: "1234567890123",
        percentage: 10.0,
        isContract: false,
        label: "Raydium Pool",
      },
      {
        address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        balance: "987654321012",
        percentage: 8.0,
        isContract: false,
      },
      {
        address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
        balance: "765432109876",
        percentage: 6.2,
        isContract: true,
        label: "LP Lock Contract",
      },
    ],
  },
  {
    tokenAddress: "RUGpull111111111111111111111111111111111111",
    chain: "solana",
    dex: "Raydium",
    pairAddress: "ScamPair1111111111111111111111111111111111",
    baseToken: "SCAM",
    quoteToken: "SOL",
    liquidityUsd: 5000,
    liquidityChange24h: -78.5,
    lpTokenSupply: "1000000000",
    lpHolders: [
      {
        address: "DeployerScam1111111111111111111111111111111",
        balance: "950000000",
        percentage: 95.0,
        isContract: false,
        label: "Deployer (Suspicious)",
      },
      { address: "RandomBuyer111111111111111111111111111111", balance: "50000000", percentage: 5.0, isContract: false },
    ],
  },
]

export const mockRugAnalysis: Record<string, RugAnalysis> = {
  DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: {
    tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    chain: "solana",
    overallRiskScore: 15,
    rugProbability: 0.05,
    confidence: 0.92,
    riskFactors: [
      {
        category: "liquidity",
        name: "Liquidity Depth",
        severity: "low",
        score: 10,
        description: "Deep liquidity across multiple DEXs",
        details: { totalLiquidityUsd: 45000000, dexCount: 3 },
      },
      {
        category: "ownership",
        name: "LP Distribution",
        severity: "low",
        score: 15,
        description: "LP tokens well distributed, no single holder dominates",
        details: { topHolderPercentage: 10, holderCount: 892341 },
      },
      {
        category: "trading",
        name: "Volume Pattern",
        severity: "low",
        score: 12,
        description: "Organic trading pattern detected",
        details: { washTradingScore: 0.08 },
      },
    ],
    warnings: [],
    recommendations: ["Continue monitoring for any sudden LP changes"],
    analyzedAt: new Date().toISOString(),
  },
  RUGpull111111111111111111111111111111111111: {
    tokenAddress: "RUGpull111111111111111111111111111111111111",
    chain: "solana",
    overallRiskScore: 95,
    rugProbability: 0.89,
    confidence: 0.95,
    riskFactors: [
      {
        category: "liquidity",
        name: "LP Concentration",
        severity: "critical",
        score: 98,
        description: "95% of LP held by deployer - extreme rug risk",
        details: { deployerLpPercentage: 95, liquidityUsd: 5000 },
      },
      {
        category: "ownership",
        name: "Mint Authority",
        severity: "critical",
        score: 100,
        description: "Mint authority not renounced - can create unlimited tokens",
        details: { mintAuthorityActive: true },
      },
      {
        category: "contract",
        name: "Honeypot Risk",
        severity: "high",
        score: 85,
        description: "Sell restrictions detected in contract",
        details: { maxSellPercentage: 1, sellTaxPercentage: 50 },
      },
      {
        category: "trading",
        name: "Wash Trading",
        severity: "high",
        score: 92,
        description: "87% of volume appears to be wash trading",
        details: { washTradingScore: 0.87, uniqueTraders: 12 },
      },
    ],
    warnings: [
      "CRITICAL: 95% LP held by single wallet",
      "CRITICAL: Mint authority still active",
      "HIGH: Possible honeypot - sell restrictions detected",
      "HIGH: Significant wash trading detected",
    ],
    recommendations: [
      "DO NOT INVEST - Extreme rug pull risk",
      "If holding, attempt to sell immediately",
      "Report token to community blacklists",
    ],
    analyzedAt: new Date().toISOString(),
  },
}

export function getTokenByAddress(address: string): TokenInfo | undefined {
  return mockTokens.find((t) => t.address === address)
}

export function getTokensByChain(chain: string): TokenInfo[] {
  return mockTokens.filter((t) => t.chain === chain)
}

export function getLiquidityByToken(address: string): TokenLiquidity | undefined {
  return mockLiquidity.find((l) => l.tokenAddress === address)
}

export function getRugAnalysis(address: string): RugAnalysis | undefined {
  return mockRugAnalysis[address]
}
