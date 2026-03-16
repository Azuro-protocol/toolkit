import { getApiEndpoint } from '../getEndpoints'
import type { ConditionState } from '../../global'
import type { ChainId } from '../../config'


export type GetConditionsStateParams = {
  chainId: ChainId
  conditionIds: string[]
}

export type ConditionStateData = {
  conditionId: string
  state: ConditionState
  outcomes: {
    id: string
    outcomeId: string
    odds: string
  }[]
}

type ConditionsStateResponse = {
  conditions: ConditionStateData[]
}

export type GetConditionsStateResult = ConditionsStateResponse['conditions']


/**
 * Fetches up-to-date condition states and outcome odds for a list of conditions.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/feed/getConditionsState
 *
 * @example
 * import { getConditionsState } from '@azuro-org/toolkit'
 *
 * const conditions = await getConditionsState({
 *   chainId: 137,
 *   conditionIds: ['300610060000000000635055340000000000000000387193'],
 * })
 * */
export const getConditionsState = async (props: GetConditionsStateParams): Promise<GetConditionsStateResult> => {
  const conditionIds = props.conditionIds?.filter(Boolean)

  if (!conditionIds?.length) {
    console.warn('getConditionsState: no conditionIds provided, skipping request')

    return []
  }

  const api = getApiEndpoint(props.chainId)

  const response = await fetch(`${api}/market-manager/condition-batch`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conditionIds,
    }),
  })

  if (!response.ok) {
    throw new Error(`getConditionsState API request failed: ${response.status} ${response.statusText}`)
  }

  const data: ConditionsStateResponse = await response.json()

  return data.conditions
}
