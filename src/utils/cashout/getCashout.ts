import { chainsData, type ChainId } from '../../config'
import { type CreateCashoutResponse } from './createCashout'


export type GetCashoutResponse = {
  txHash: string
} & CreateCashoutResponse

export type GetCashoutResult = GetCashoutResponse | null

export type GetCashoutParams = {
  chainId: ChainId
  orderId: string
}

/**
 * Retrieves the status and details of a cashout order by its order ID.
 * Returns null if the cashout order is not found.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/utils/cashout/getCashout
 *
 * @example
 * import { getCashout } from '@azuro-org/toolkit'
 *
 * const chainId = 100
 * const orderId = 'abc123'
 *
 * const cashout = await getCashout({ chainId, orderId })
 *
 * if (cashout) {
 *   console.log(`State: ${cashout.state}`)
 *   console.log(`Transaction hash: ${cashout.txHash}`)
 * }
 * */
export const getCashout = async ({ chainId, orderId }: GetCashoutParams): Promise<GetCashoutResult> => {
  const { api, contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const response = await fetch(`${api}/cashout/${orderId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetCashoutResponse = await response.json()

  return data
}
