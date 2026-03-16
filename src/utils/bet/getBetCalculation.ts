import { type Address, isAddress } from 'viem'

import { type ChainId, chainsData } from '../../config'
import { type Selection } from '../../global'


export type GetBetCalculationParams = {
  chainId: ChainId
  selections: Selection[]
  account: Address | undefined
}

export type GetBetCalculationResponse = {
  response: {
    /** if `minBet` is `undefined`, there is no bottom limit */
    minBet: number | undefined
    maxBet: number
    maxPayout: `${number}`
  }
}

export type GetBetCalculationResult = GetBetCalculationResponse['response']

/**
 * Calculates the minimum and maximum bet amount for given selections.
 * User's account is required to provide the **correct** maximum bet amount.
 * It may be undefined if the user isn't logged in.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/bet/getBetCalculation
 *
 * @example
 * import { getBetCalculation } from '@azuro-org/toolkit'
 *
 * const account = userWallet?.address
 * const selections = [
 *   { conditionId: '1', outcomeId: '1' },
 * ]
 *
 * const { minBet, maxBet } = await getBetCalculation({ selections, account })
 * */
export const getBetCalculation = async (props: GetBetCalculationParams): Promise<GetBetCalculationResult> => {
  const { chainId, selections, account } = props

  const { api, environment } = chainsData[chainId]

  const params: any = {
    bets: selections.map(({ conditionId, outcomeId }) => ({
      conditionId,
      outcomeId: +outcomeId,
    })),
    environment,
  }

  if (account && isAddress(account)) {
    params.wallet = account
  }

  const response = await fetch(`${api}/bet/calculation`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetBetCalculationResponse = await response.json()

  return data.response
}
