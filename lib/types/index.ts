// Core type definitions for Code Xero Analytics Platform

export type Chain = "solana" | "bnb"

export type AlertType = "whale_movement" | "lp_change" | "price_anomaly" | "rug_warning" | "volume_spike"

export type Severity = "low" | "medium" | "high" | "critical"

export type UserTier = "free" | "pro" | "enterprise"

// Token Analytics Types
export interface TokenInfo {
  address: string
  chain: Chain
  symbol: string
  name: string
  decimals: number
  totalSupply: string
  circulatingSupply: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  holders: number
  createdAt: string
}

export interface TokenLiquidity {
  tokenAddress: string
  chain: Chain
  dex: string
  pairAddress: string
  baseToken: string
  quoteToken: string
  liquidityUsd: number
  liquidityChange24h: number
  lpTokenSupply: string
  lpHolders: LPHolder[]
}

export interface LPHolder {
  address: string
  balance: string
  percentage: number
  isContract: boolean
  label?: string
}

// Wallet Analytics Types
export interface WalletInfo {
  address: string
  chain: Chain
  label?: string
  isWhale: boolean
  totalValueUsd: number
  tokenCount: number
  nftCount: number
  firstTxAt: string
  lastTxAt: string
  txCount: number
}

export interface WalletHolding {
  tokenAddress: string
  tokenSymbol: string
  tokenName: string
  balance: string
  valueUsd: number
  percentage: number
  avgBuyPrice?: number
  pnl?: number
  pnlPercentage?: number
}

export interface WalletTransaction {
  hash: string
  chain: Chain
  type: "swap" | "transfer" | "mint" | "burn" | "lp_add" | "lp_remove"
  timestamp: string
  from: string
  to: string
  tokenIn?: TokenAmount
  tokenOut?: TokenAmount
  valueUsd: number
  fee: number
}

export interface TokenAmount {
  address: string
  symbol: string
  amount: string
  valueUsd: number
}

// Rug Detection Types
export interface RugAnalysis {
  tokenAddress: string
  chain: Chain
  overallRiskScore: number // 0-100, higher = more risky
  rugProbability: number // 0-1
  confidence: number // 0-1
  riskFactors: RiskFactor[]
  warnings: string[]
  recommendations: string[]
  analyzedAt: string
}

export interface RiskFactor {
  category: "liquidity" | "ownership" | "contract" | "trading" | "social"
  name: string
  severity: Severity
  score: number // 0-100
  description: string
  details: Record<string, unknown>
}

// AI Analysis Types
export interface AIAnalysisRequest {
  query: string
  context?: {
    tokenAddress?: string
    walletAddress?: string
    chain?: Chain
  }
}

export interface AIAnalysisResponse {
  query: string
  bias: "bullish" | "bearish" | "neutral"
  confidence: number // 0-1
  riskScore: number // 0-100
  rugProbability: number // 0-1
  keyWallets: KeyWallet[]
  flows: TokenFlow[]
  explanation: string
  factors: AnalysisFactor[]
  recommendations: string[]
  dataTimestamp: string
  cached: boolean
}

export interface KeyWallet {
  address: string
  label?: string
  role: "whale" | "insider" | "deployer" | "market_maker" | "retail"
  influence: number // 0-1
  recentActivity: string
}

export interface TokenFlow {
  from: string
  to: string
  amount: string
  valueUsd: number
  timestamp: string
  type: "accumulation" | "distribution" | "wash" | "normal"
}

export interface AnalysisFactor {
  name: string
  impact: "positive" | "negative" | "neutral"
  weight: number
  explanation: string
}

// Alert Types
export interface Alert {
  id: string
  userId: string
  alertType: AlertType
  chain: Chain
  targetAddress: string
  targetType: "token" | "wallet"
  threshold?: Record<string, number>
  isActive: boolean
  createdAt: string
}

export interface AlertNotification {
  id: string
  alertId: string
  userId: string
  title: string
  message: string
  severity: Severity
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

// DEX Types
export interface DEXTrade {
  hash: string
  chain: Chain
  dex: string
  pairAddress: string
  type: "buy" | "sell"
  tokenIn: TokenAmount
  tokenOut: TokenAmount
  trader: string
  timestamp: string
  priceImpact: number
}

export interface DEXPool {
  address: string
  chain: Chain
  dex: string
  token0: TokenInfo
  token1: TokenInfo
  reserve0: string
  reserve1: string
  liquidityUsd: number
  volume24h: number
  fees24h: number
  apy: number
}

// Market Overview
export interface MarketOverview {
  chain: Chain
  totalValueLocked: number
  volume24h: number
  transactions24h: number
  activeWallets24h: number
  topGainers: TokenInfo[]
  topLosers: TokenInfo[]
  trending: TokenInfo[]
  whaleActivity: WalletTransaction[]
}
