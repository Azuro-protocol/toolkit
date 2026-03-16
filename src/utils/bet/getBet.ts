import { chainsData, type ChainId } from '../../config'
import type { BetOrderData } from './types'


export type GetBetParams = {
  chainId: ChainId
  orderId: string
}

export type GetBetResponse = BetOrderData

export type GetBetResult = GetBetResponse | null

/**
 * Retrieves bet order data by order ID from the Azuro API.
 * Returns null if the bet order is not found.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/bet/getBet
 *
 * @example
 * import { getBet } from '@azuro-org/toolkit'
 *
 * const orderId = '0x123...'
 * const chainId = 137
 *
 * const bet = await getBet({ chainId, orderId })
 *
 * if (bet) {
 *   console.log('Bet state:', bet.state)
 *   console.log('Bet result:', bet.result)
 * }
 * */
export const getBet = async ({ chainId, orderId }: GetBetParams): Promise<GetBetResult> => {
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
