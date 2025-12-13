"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChainSelectorProps {
  selected: "all" | "solana" | "bnb"
  onChange: (chain: "all" | "solana" | "bnb") => void
}

export function ChainSelector({ selected, onChange }: ChainSelectorProps) {
  const chains = [
    { id: "all" as const, name: "All Chains" },
    { id: "solana" as const, name: "Solana" },
    { id: "bnb" as const, name: "BNB Chain" },
  ]

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
      {chains.map((chain) => (
        <Button
          key={chain.id}
          variant="ghost"
          size="sm"
          onClick={() => onChange(chain.id)}
          className={cn("h-8 px-3", selected === chain.id && "bg-primary text-primary-foreground hover:bg-primary/90")}
        >
          {chain.name}
        </Button>
      ))}
    </div>
  )
}
