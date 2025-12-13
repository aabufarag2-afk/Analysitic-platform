"use client"

import type { WalletInfo } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Bell, Share2, ExternalLink, Copy, Check, Fish } from "lucide-react"
import { useState } from "react"

interface WalletHeaderProps {
  wallet: WalletInfo
}

export function WalletHeader({ wallet }: WalletHeaderProps) {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const explorerUrl =
    wallet.chain === "solana"
      ? `https://solscan.io/account/${wallet.address}`
      : `https://bscscan.com/address/${wallet.address}`

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center">
          {wallet.isWhale ? <Fish className="h-8 w-8 text-primary" /> : <span className="text-2xl font-bold">W</span>}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{wallet.label || "Unknown Wallet"}</h1>
            {wallet.isWhale && (
              <Badge className="bg-primary/10 text-primary border-primary/30">
                <Fish className="h-3 w-3 mr-1" />
                Whale
              </Badge>
            )}
            <Badge variant="outline">{wallet.chain.toUpperCase()}</Badge>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-sm text-muted-foreground font-mono">
              {wallet.address.slice(0, 12)}...{wallet.address.slice(-8)}
            </code>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
              {copied ? <Check className="h-3 w-3 text-chart-2" /> : <Copy className="h-3 w-3" />}
            </Button>
            <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Watch
        </Button>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Alert
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
