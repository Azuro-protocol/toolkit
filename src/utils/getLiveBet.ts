import { chainsData, liveSupportedChains, type ChainId } from '../config'
import { type CreateLiveBetResponse } from './createLiveBet'


export type GetLiveBetResponse = {
  txHash: string
  odds: string
  betId: string
} & CreateLiveBetResponse

type Props = {
  chainId: ChainId
  orderId: string
}

export const getLiveBet = async ({ chainId, orderId }: Props) => {
  if (!liveSupportedChains.includes(chainId)) {
    throw new Error('provided chainId is not supported for live bet')
  }

  const { api } = chainsData[chainId]

  const response = await fetch(`${api}/orders/${orderId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetLiveBetResponse = await response.json()

  return data
}
