"use client"

import type { TokenInfo } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Share2, Bell, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

interface TokenHeaderProps {
  token: TokenInfo
}

export function TokenHeader({ token }: TokenHeaderProps) {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(token.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const explorerUrl =
    token.chain === "solana"
      ? `https://solscan.io/token/${token.address}`
      : `https://bscscan.com/token/${token.address}`

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center">
          <span className="text-2xl font-bold">{token.symbol.slice(0, 2)}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{token.name}</h1>
            <Badge variant="secondary">{token.symbol}</Badge>
            <Badge variant="outline">{token.chain.toUpperCase()}</Badge>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-sm text-muted-foreground font-mono">
              {token.address.slice(0, 12)}...{token.address.slice(-8)}
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
          <Star className="h-4 w-4 mr-2" />
          Watchlist
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
