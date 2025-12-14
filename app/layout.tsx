import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OnchainIQ | AI-Powered Blockchain Analytics",
  description:
    "Production-grade AI analytics platform for Solana and BNB Chain. On-chain intelligence, whale tracking, rug detection, and natural language queries.",
  generator: "v0.app",
  keywords: [
    "blockchain analytics",
    "solana",
    "bnb chain",
    "whale tracking",
    "rug detection",
    "crypto intelligence",
    "defi analytics",
  ],
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
