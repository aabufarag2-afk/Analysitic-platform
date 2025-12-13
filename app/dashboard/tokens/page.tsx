"use client"

import { useState } from "react"
import { mockTokens } from "@/lib/mock-data/tokens"
import { ChainSelector } from "@/components/dashboard/chain-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, TrendingUp, TrendingDown, ExternalLink, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function TokensPage() {
  const [selectedChain, setSelectedChain] = useState<"all" | "solana" | "bnb">("all")
  const [search, setSearch] = useState("")

  const filteredTokens = mockTokens.filter((token) => {
    const matchesChain = selectedChain === "all" || token.chain === selectedChain
    const matchesSearch =
      search === "" ||
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.address.toLowerCase().includes(search.toLowerCase())
    return matchesChain && matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Token Analytics</h1>
          <p className="text-muted-foreground">Explore and analyze tokens across Solana and BNB Chain</p>
        </div>
        <ChainSelector selected={selectedChain} onChange={setSelectedChain} />
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, symbol, or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary"
              />
            </div>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Watchlist
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Token Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tokens</CardTitle>
          <CardDescription>{filteredTokens.length} tokens found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Volume (24h)</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Holders</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTokens.map((token, index) => (
                <TableRow key={token.address} className="hover:bg-secondary/50">
                  <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/tokens/${token.address}`} className="flex items-center gap-3 group">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-xs font-semibold">{token.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{token.symbol}</p>
                        <p className="text-sm text-muted-foreground">{token.name}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {token.chain.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={cn(
                        "flex items-center justify-end gap-1",
                        token.priceChange24h >= 0 ? "text-chart-2" : "text-destructive",
                      )}
                    >
                      {token.priceChange24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {token.priceChange24h > 0 ? "+" : ""}
                      {token.priceChange24h.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">${(token.volume24h / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="text-right font-mono">${(token.marketCap / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="text-right font-mono">{token.holders.toLocaleString()}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/tokens/${token.address}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
