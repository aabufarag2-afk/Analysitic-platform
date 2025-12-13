import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Shield, Zap, Bot } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IQ</span>
            </div>
            <span className="font-semibold">OnchainIQ</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>
                Launch App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
          <Zap className="h-4 w-4" />
          AI-Powered Blockchain Intelligence
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          On-Chain Intelligence for
          <br />
          <span className="text-primary">Solana & BNB Chain</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Whale tracking, rug detection, and natural language queries. Make data-driven decisions with real-time
          on-chain analytics.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8">
              Start Analyzing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard/ai">
            <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
              Try AI Query
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Bot,
              title: "AI Queries",
              description: "Ask questions in plain English. Get structured intelligence.",
            },
            {
              icon: Shield,
              title: "Rug Detection",
              description: "LP analysis, mint authority checks, and honeypot detection.",
            },
            {
              icon: BarChart3,
              title: "Whale Tracking",
              description: "Monitor large wallets and track accumulation patterns.",
            },
            {
              icon: Zap,
              title: "Real-time Alerts",
              description: "Get notified on whale movements and LP changes.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-2xl bg-card border border-border p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start analyzing tokens and tracking whales with OnchainIQ today.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8">
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>OnchainIQ - AI-Powered Blockchain Analytics</p>
          <p className="mt-2">Not financial advice. Always DYOR.</p>
        </div>
      </footer>
    </div>
  )
}
