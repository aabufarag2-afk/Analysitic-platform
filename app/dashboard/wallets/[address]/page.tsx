import { notFound } from "next/navigation"
import { getWalletByAddress, getWalletHoldings, mockTransactions } from "@/lib/mock-data/wallets"
import { WalletHeader } from "@/components/wallets/wallet-header"
import { WalletStats } from "@/components/wallets/wallet-stats"
import { HoldingsTable } from "@/components/wallets/holdings-table"
import { TransactionHistory } from "@/components/wallets/transaction-history"
import { WalletPnL } from "@/components/wallets/wallet-pnl"

interface WalletPageProps {
  params: Promise<{ address: string }>
}

export default async function WalletPage({ params }: WalletPageProps) {
  const { address } = await params
  const wallet = getWalletByAddress(address)

  if (!wallet) {
    notFound()
  }

  const holdings = getWalletHoldings(address)
  const transactions = mockTransactions.filter((tx) => tx.from === address || tx.to === address)

  return (
    <div className="p-6 space-y-6">
      <WalletHeader wallet={wallet} />

      <WalletStats wallet={wallet} holdings={holdings} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HoldingsTable holdings={holdings} />
        </div>
        <div>
          <WalletPnL holdings={holdings} />
        </div>
      </div>

      <TransactionHistory transactions={transactions} walletAddress={address} />
    </div>
  )
}
