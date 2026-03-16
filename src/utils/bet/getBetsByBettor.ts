import type { Address, Hex } from 'viem'

import type { BetOrderData } from './types'
import { serializeApiParams } from '../../helpers/serializeApiParams'
import { type BetOrderState, type BetOrderResult } from '../../global'
import { chainsData, type ChainId } from '../../config'


export type GetBetsByBettorParams = {
  chainId: ChainId
  bettor: Address
  affiliate?: Address
  result?: BetOrderResult | BetOrderResult[]
  state?: BetOrderState | BetOrderState[]
  isRedeemed?: boolean

  offset?: number
  /** default: 100 */
  limit?: number
}

export type GetBetsByBettorResponse = {
  orders: BetOrderData[]
}

export type GetBetsByBettorResult = (BetOrderData & { lpAddress: Address })[] | null

/**
 * Retrieves all bet orders for a specific bettor address with optional filtering.
 * Supports pagination and filtering by state, result, affiliate, and redemption status.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/getBetsByBettor
 *
 * @example
 * import { getBetsByBettor } from '@azuro-org/toolkit'
 *
 * const chainId = 137
 * const bettor = '0x...'
 *
 * // Get all bets
 * const allBets = await getBetsByBettor({ chainId, bettor })
 *
 * // Get only redeemable bets
 * const redeemableBets = await getBetsByBettor({
 *   chainId,
 *   bettor,
 *   result: [BetOrderResult.Won, BetOrderResult.Canceled],
 *   isRedeemed: false,
 *   limit: 1000,
 * })
 * */
export const getBetsByBettor = async (props: GetBetsByBettorParams): Promise<GetBetsByBettorResult> => {
  const { chainId, bettor, offset, limit, result, affiliate, isRedeemed, state } = props
  const { api, environment, contracts } = chainsData[chainId]

  if (!bettor) {
    throw new Error('getBetsByBettor: "bettor" param is required')
  }

  const params = serializeApiParams({
    environment,
    offset: offset || 0,
    limit: limit || 100,
    states: state,
    result,
    affiliate,
    isRedeemed,
  })

  const response = await fetch(`${api}/bet/orders/bettor/${bettor}?${params}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetBetsByBettorResponse = await response.json()

  return data.orders.map((order) => ({
    ...order,
    lpAddress: contracts.lp.address,
  }))
}
