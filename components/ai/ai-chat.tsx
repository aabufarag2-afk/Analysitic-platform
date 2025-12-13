"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const EXAMPLE_QUERIES = [
  "Is BONK safe to invest in?",
  "Are whales accumulating JUP?",
  "Show me suspicious tokens on Solana",
  "What's the rug probability for SCAM token?",
  "Compare liquidity on Raydium vs PancakeSwap",
]

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, status, setInput } = useChat({
    api: "/api/ai/chat",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Code Xero AI</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Ask me anything about Solana or BNB Chain tokens, wallets, and market activity. I analyze on-chain data to
              give you actionable intelligence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
              {EXAMPLE_QUERIES.map((query) => (
                <button
                  key={query}
                  onClick={() => setInput(query)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <Card
                className={cn(
                  "max-w-[80%]",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card",
                )}
              >
                <CardContent className="p-3">
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </CardContent>
              </Card>
              {message.role === "user" && (
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <Card className="bg-card">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Analyzing on-chain data...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any token, wallet, or market activity..."
            className="min-h-[44px] max-h-32 resize-none bg-secondary"
            rows={1}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="h-auto px-4">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are based on on-chain data. Always DYOR before investing.
        </p>
      </div>
    </div>
  )
}
