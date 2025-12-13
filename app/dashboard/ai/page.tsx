import { AIChat } from "@/components/ai/ai-chat"
import { AnalysisCard } from "@/components/ai/analysis-card"

export default function AIPage() {
  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold">AI Intelligence</h1>
          <p className="text-sm text-muted-foreground">Natural language queries powered by on-chain data</p>
        </div>
        <div className="flex-1">
          <AIChat />
        </div>
      </div>

      {/* Side Panel - Quick Analysis */}
      <div className="w-96 flex-shrink-0 p-4 overflow-y-auto hidden xl:block">
        <AnalysisCard chain="solana" />
      </div>
    </div>
  )
}
