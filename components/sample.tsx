"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useLuckyCardContract } from "@/hooks/useContract"
import { isAddress } from "viem"

const LuckyCardSample = () => {
  const { isConnected } = useAccount()
  const { data, actions, state } = useLuckyCardContract()
  const [txHash, setTxHash] = useState("")

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Lucky Card</h2>
          <p className="text-muted-foreground">Connect wallet to draw your lucky card.</p>
        </div>
      </div>
    )
  }

  const handleDraw = async () => {
    try {
      const tx = await actions.drawCard()
      if (tx) setTxHash(tx)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-background p-6 flex justify-center items-center">
      <div className="bg-card border border-border rounded-xl shadow-md p-6 w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Lucky Card Draw</h1>
        {data.myCard && (
          <div className="p-4 bg-muted rounded-lg text-center text-lg">{data.myCard}</div>
        )}
        <button
          onClick={handleDraw}
          disabled={state.isLoading || state.isPending}
          className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {state.isLoading || state.isPending ? "Drawing..." : "Draw Lucky Card"}
        </button>
        {txHash && (
          <div className="p-3 bg-muted rounded-lg text-xs font-mono break-all">
            {txHash}
          </div>
        )}
      </div>
    </div>
  )
}

export default LuckyCardSample
