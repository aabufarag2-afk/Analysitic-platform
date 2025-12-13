"use client"

import { useState } from "react"
import { ChainSelector } from "@/components/dashboard/chain-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockWhaleWallets, mockTransactions } from "@/lib/mock-data/wallets"
import { Search, Wallet, TrendingUp, Eye, ExternalLink, Fish } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default function WalletsPage() {
  const [selectedChain, setSelectedChain] = useState<"all" | "solana" | "bnb">("all")
  const [search, setSearch] = useState("")

  const filteredWallets = mockWhaleWallets.filter((wallet) => {
    const matchesChain = selectedChain === "all" || wallet.chain === selectedChain
    const matchesSearch =
      search === "" ||
      wallet.address.toLowerCase().includes(search.toLowerCase()) ||
      wallet.label?.toLowerCase().includes(search.toLowerCase())
    return matchesChain && matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wallet Analytics</h1>
          <p className="text-muted-foreground">Track whale wallets and analyze holdings across chains</p>
        </div>
        <ChainSelector selected={selectedChain} onChange={setSelectedChain} />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by address or label..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary"
              />
            </div>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Watchlist
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Fish className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracked Whales</p>
                <p className="text-2xl font-bold">{filteredWallets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Combined Value</p>
                <p className="text-2xl font-bold">
                  ${(filteredWallets.reduce((acc, w) => acc + w.totalValueUsd, 0) / 1e9).toFixed(2)}B
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Holdings</p>
                <p className="text-2xl font-bold">
                  {Math.round(filteredWallets.reduce((acc, w) => acc + w.tokenCount, 0) / filteredWallets.length || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-chart-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Activity</p>
                <p className="text-2xl font-bold">{mockTransactions.length} txns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Whale Table */}
      <Card>
        <CardHeader>
          <CardTitle>Whale Wallets</CardTitle>
          <CardDescription>Known high-value wallets and entities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">Tokens</TableHead>
                <TableHead className="text-right">Transactions</TableHead>
                <TableHead className="text-right">Last Active</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.map((wallet) => (
                <TableRow key={wallet.address} className="hover:bg-secondary/50">
                  <TableCell>
                    <Link href={`/dashboard/wallets/${wallet.address}`} className="group">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                          <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-mono text-sm group-hover:text-primary transition-colors">
                            {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                          </p>
                          {wallet.label && <p className="text-xs text-muted-foreground">{wallet.label}</p>}
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {wallet.chain.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${(wallet.totalValueUsd / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="text-right">{wallet.tokenCount}</TableCell>
                  <TableCell className="text-right font-mono">{wallet.txCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formatDistanceToNow(new Date(wallet.lastTxAt), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/wallets/${wallet.address}`}>
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
