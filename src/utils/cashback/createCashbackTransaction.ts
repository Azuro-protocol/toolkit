import { type Hex, type Address, encodeFunctionData, parseUnits } from 'viem'
import { polygon } from 'viem/chains'

import { chainsData, type ChainId } from '../../config'
import { type Environment } from '../../envs'
import { cashbackAbi } from '../../abis'


type CreateCashoutResponse = {
  userAddress: Address
  amount: string
  network: Environment
  currency: string
  cashbackContractAddress: Address
  clientId: string
  createdAt: string
  updatedAt: string
  signature: Hex
}

export type CashbackTransaction = {
  to: Address
  data: Hex
}

type Props = {
  account: Address
  affiliate: Address
  expiresAt: number
  chainId?: ChainId
}

export const createCashbackTransaction = async (props: Props): Promise<CashbackTransaction | null> => {
  const { account, affiliate, expiresAt, chainId = polygon.id } = props

  const { api, environment, betToken } = chainsData[chainId]

  const response = await fetch(`${api}/cashback/take`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userAddress: account,
      affiliateAddress: affiliate,
      network: environment,
      currency: betToken.symbol,
      expiresAt,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { cashbackContractAddress, amount, signature }: CreateCashoutResponse = await response.json()

  const cashbackId = BigInt(cashbackContractAddress) + BigInt(account) + BigInt(Math.floor(Date.now() / 1000))

  const tx: CashbackTransaction = {
    to: cashbackContractAddress,
    data: encodeFunctionData({
      abi: cashbackAbi,
      functionName: 'withdrawCashBack',
      args: [
        {
          chainId: BigInt(chainId),
          cashBackContract: cashbackContractAddress,
          affiliate,
          token: betToken.address,
          account,
          amount: parseUnits(amount, betToken.decimals),
          id: cashbackId,
          expiresAt: BigInt(expiresAt),
        },
        signature,
      ],
    }),
  }

  return tx
}
