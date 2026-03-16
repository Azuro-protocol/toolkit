import { getApiEndpoint } from '../getEndpoints'
import { environments } from '../../envs'
import type { ConditionState } from '../../global'
import type { ChainId } from '../../config'


export type GetConditionsByGameIdsParams = {
  chainId: ChainId
  gameIds: string | string[]
}

export type ConditionDetailedData = {
  id: string
  conditionId: string
  state: ConditionState
  title: string | null
  isExpressForbidden: boolean
  isPrematchEnabled: boolean
  isLiveEnabled: boolean
  margin: string
  outcomes: {
    title: string | null
    outcomeId: string
    odds: string
  }[]
  game: {
    gameId: string
    sport: {
      sportId: string
    }
  }
  wonOutcomeIds: string[]
}

export type GetConditionsByGameIdsResponse = {
  conditions: ConditionDetailedData[]
}

export type GetConditionsByGameIdsResponseResult = GetConditionsByGameIdsResponse['conditions']

/**
 * Fetches detailed conditions data for a given list of game IDs.
 * Returns comprehensive condition information including outcomes, odds, and game relationships.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/feed/getConditionsByGameIds
 *
 * @example
 * import { getConditionsByGameIds } from '@azuro-org/toolkit'
 *
 * const conditions = await getConditionsByGameIds({
 *   chainId: 137,
 *   gameIds: ['1006000000000077484167'],
 * })
 * */
export const getConditionsByGameIds = async (props: GetConditionsByGameIdsParams): Promise<GetConditionsByGameIdsResponseResult> => {
  const gameIds = Array.isArray(props.gameIds) ? props.gameIds.filter(Boolean) : [ props.gameIds ]

  if (!gameIds.length) {
    console.warn('getConditionsByGameIds: no game id passed')

    return []
  }

  const api = getApiEndpoint(props.chainId)
  const environment = environments[props.chainId]

  const response = await fetch(`${api}/market-manager/conditions-by-game-ids`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameIds,
      environment,
    }),
  })

  if (!response.ok) {
    throw new Error(`getConditionsByGameIds API request failed: ${response.status} ${response.statusText}`)
  }

  const data: GetConditionsByGameIdsResponse = await response.json()

  return data.conditions
}
