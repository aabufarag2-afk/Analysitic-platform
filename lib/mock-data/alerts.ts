import type { Alert, AlertNotification } from "@/lib/types"

export const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    userId: "user-1",
    alertType: "whale_movement",
    chain: "solana",
    targetAddress: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    targetType: "wallet",
    threshold: { minValueUsd: 100000 },
    isActive: true,
    createdAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "alert-2",
    userId: "user-1",
    alertType: "lp_change",
    chain: "solana",
    targetAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    targetType: "token",
    threshold: { changePercentage: 10 },
    isActive: true,
    createdAt: "2024-12-05T00:00:00Z",
  },
  {
    id: "alert-3",
    userId: "user-1",
    alertType: "price_anomaly",
    chain: "bnb",
    targetAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    targetType: "token",
    threshold: { changePercentage: 15 },
    isActive: true,
    createdAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "alert-4",
    userId: "user-1",
    alertType: "rug_warning",
    chain: "solana",
    targetAddress: "RUGpull111111111111111111111111111111111111",
    targetType: "token",
    threshold: { riskScore: 70 },
    isActive: false,
    createdAt: "2024-12-10T00:00:00Z",
  },
  {
    id: "alert-5",
    userId: "user-1",
    alertType: "volume_spike",
    chain: "solana",
    targetAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    targetType: "token",
    threshold: { multiplier: 3 },
    isActive: true,
    createdAt: "2024-12-12T00:00:00Z",
  },
]

export const mockNotifications: AlertNotification[] = [
  {
    id: "notif-1",
    alertId: "alert-1",
    userId: "user-1",
    title: "Whale Movement Detected",
    message: "5Q54...4j1 moved $5.2M worth of SOL to Raydium",
    severity: "high",
    data: {
      walletAddress: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
      amount: 5200000,
      destination: "Raydium",
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "notif-2",
    alertId: "alert-2",
    userId: "user-1",
    title: "LP Change Alert",
    message: "BONK liquidity decreased by 12.5% in the last hour",
    severity: "medium",
    data: {
      tokenSymbol: "BONK",
      changePercentage: -12.5,
      newLiquidity: 39375000,
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "notif-3",
    alertId: "alert-4",
    userId: "user-1",
    title: "Critical Rug Warning",
    message: "SCAM token risk score increased to 95/100 - LP removal detected",
    severity: "critical",
    data: {
      tokenSymbol: "SCAM",
      riskScore: 95,
      lpRemoved: 4500,
    },
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "notif-4",
    alertId: "alert-5",
    userId: "user-1",
    title: "Volume Spike",
    message: "JUP volume increased 4.2x in the last 4 hours",
    severity: "low",
    data: {
      tokenSymbol: "JUP",
      volumeMultiplier: 4.2,
      currentVolume: 89000000,
    },
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "notif-5",
    alertId: "alert-3",
    userId: "user-1",
    title: "Price Anomaly Detected",
    message: "CAKE price dropped 18% in 30 minutes with unusual sell pressure",
    severity: "high",
    data: {
      tokenSymbol: "CAKE",
      priceChange: -18,
      timeframe: "30m",
    },
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
]

export function getAlertById(id: string): Alert | undefined {
  return mockAlerts.find((a) => a.id === id)
}

export function getNotificationById(id: string): AlertNotification | undefined {
  return mockNotifications.find((n) => n.id === id)
}

export function getUnreadNotifications(): AlertNotification[] {
  return mockNotifications.filter((n) => !n.isRead)
}

export function getNotificationsByAlertId(alertId: string): AlertNotification[] {
  return mockNotifications.filter((n) => n.alertId === alertId)
}
