"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { formatEther } from "viem"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractData {
  contractBalance: string
  myCard: string
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  drawCard: () => Promise<void>
}

export const useLuckyCardContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { data: contractBalance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "myLuckyCard",
    query: { enabled: false }
  })

  const { data: myCard, refetch: refetchMyCard } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "myLuckyCard",
    query: { enabled: !!address }
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
      refetchMyCard()
    }
  }, [isConfirmed, refetchBalance, refetchMyCard])

  const drawCardAction = async () => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "drawCard",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    contractBalance: contractBalance ? formatEther(BigInt(0)) : "0",
    myCard: myCard ? (myCard as string) : ""
  }

  const actions: ContractActions = { drawCard: drawCardAction }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  }

  return { data, actions, state }
}
