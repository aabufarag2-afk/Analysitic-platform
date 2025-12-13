import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Shield, Zap, Bot, Wallet, LineChart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IQ</span>
            </div>
            <span className="font-semibold">OnchainIQ</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard/tokens"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tokens
            </Link>
            <Link
              href="/dashboard/wallets"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Wallets
            </Link>
            <Link
              href="/dashboard/rug-detector"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Rug Detector
            </Link>
            <Link
              href="/dashboard/ai"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              AI Query
            </Link>
          </nav>
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
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/auth/sign-up">
            <Button size="lg" className="h-12 px-8">
              Get Started Free
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Analytics Tools</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to analyze tokens, track whales, and detect rugs on Solana and BNB Chain.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Bot,
              title: "AI Queries",
              description:
                "Ask questions in plain English. Get structured intelligence with risk scores and recommendations.",
              href: "/dashboard/ai",
            },
            {
              icon: Shield,
              title: "Rug Detection",
              description: "LP analysis, mint authority checks, honeypot detection, and wash trading identification.",
              href: "/dashboard/rug-detector",
            },
            {
              icon: BarChart3,
              title: "Whale Tracking",
              description: "Monitor large wallets, track accumulation patterns, and follow smart money.",
              href: "/dashboard/wallets",
            },
            {
              icon: LineChart,
              title: "Token Analytics",
              description: "Deep dive into any token with price charts, holder distribution, and liquidity analysis.",
              href: "/dashboard/tokens",
            },
            {
              icon: Wallet,
              title: "Wallet Analysis",
              description: "Full portfolio breakdown, P&L tracking, and transaction history for any wallet.",
              href: "/dashboard/wallets",
            },
            {
              icon: Zap,
              title: "Real-time Alerts",
              description: "Get notified on whale movements, LP changes, and anomalies as they happen.",
              href: "/dashboard/alerts",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Tokens Analyzed" },
              { value: "10K+", label: "Wallets Tracked" },
              { value: "99.2%", label: "Rug Detection Rate" },
              { value: "< 1s", label: "Query Response" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-2xl bg-card border border-border p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start analyzing tokens and tracking whales with OnchainIQ today. Free tier includes 10 AI queries per day.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/auth/sign-up">
              <Button size="lg" className="h-12 px-8">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">IQ</span>
                </div>
                <span className="font-semibold text-sm">OnchainIQ</span>
              </div>
              <p className="text-xs text-muted-foreground">AI-Powered Blockchain Analytics for Solana & BNB Chain</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard/tokens" className="hover:text-foreground">
                    Token Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/wallets" className="hover:text-foreground">
                    Wallet Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/rug-detector" className="hover:text-foreground">
                    Rug Detector
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/ai" className="hover:text-foreground">
                    AI Query
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/alerts" className="hover:text-foreground">
                    Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/dex" className="hover:text-foreground">
                    DEX Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/login" className="hover:text-foreground">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/sign-up" className="hover:text-foreground">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/settings" className="hover:text-foreground">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>OnchainIQ - AI-Powered Blockchain Analytics</p>
            <p className="mt-2">Not financial advice. Always DYOR.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
