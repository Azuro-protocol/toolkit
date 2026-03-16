import { type ChainId, chainsData } from '../../config'


type GetPrecalculatedCashoutsResponse = {
  margin: string
  marginMin: string
  availables: {
    conditionId: string
    available: boolean
    outcomes: {
      outcomeId: number
      price: string
    }[]
  }[]
}

export type GetPrecalculatedCashoutsResult = GetPrecalculatedCashoutsResponse | null
/** @deprecated use GetPrecalculatedCashoutsResult instead */
export type GetPrecalculatedCashouts = GetPrecalculatedCashoutsResult

export type GetPrecalculatedCashoutsParams = {
  chainId: ChainId
  conditionIds: string[]
}

/**
 * Retrieves precalculated cashout availability and prices for specified conditions.
 * Returns margin information and outcome prices for each available condition.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/utils/cashout/getPrecalculatedCashouts
 *
 * @example
 * import { getPrecalculatedCashouts } from '@azuro-org/toolkit'
 *
 * const chainId = 100
 * const conditionIds = ['123', '456', '789']
 *
 * const cashouts = await getPrecalculatedCashouts({
 *   chainId,
 *   conditionIds,
 * })
 *
 * if (cashouts) {
 *   cashouts.availables.forEach(({ conditionId, available, outcomes }) => {
 *     console.log(`Condition ${conditionId} available: ${available}`)
 *     outcomes.forEach(({ outcomeId, price }) => {
 *       console.log(`  Outcome ${outcomeId}: ${price}`)
 *     })
 *   })
 * }
 * */
export const getPrecalculatedCashouts = async (props: GetPrecalculatedCashoutsParams): Promise<GetPrecalculatedCashoutsResult> => {
  const { chainId, conditionIds } = props
  const { api, contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const response = await fetch(`${api}/cashout/get-available`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conditionIds,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetPrecalculatedCashoutsResponse = await response.json()

  return data
}
