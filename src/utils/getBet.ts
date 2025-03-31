import { type CreateBetResponse } from '../global'
import { chainsData, type ChainId } from '../config'
import { type Environment } from '../envs'


export type GetBetResponse = {
  txHash: string
  odds: number
  clearOdds: number
  betId: number
  createdAt: string
  updatedAt: string
  core: string
  bettor: string
  affiliate: string
  stake: number
  maxStake: number
  environment: Environment
} & CreateBetResponse

type Props = {
  chainId: ChainId
  orderId: string
}

export const getBet = async ({ chainId, orderId }: Props) => {
  const { api } = chainsData[chainId]

  const response = await fetch(`${api}/bet/orders/${orderId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetBetResponse = await response.json()

  return data
}
