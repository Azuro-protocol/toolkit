import { getApiEndpoint } from '../getEndpoints'
import type { ChainId } from '../../config'
// import { environments } from '../../envs'
import type { GameData } from './types'


export type GetGamesByIdsParams = {
  chainId: ChainId
  gameIds: string[]
}

type GetGamesByIdsResponse = {
  games: GameData[]
}

export type GetGamesByIdsResult = GetGamesByIdsResponse['games']

/**
 * Fetches game data for a specific list of game IDs.
 * Returns detailed information for each requested game including participants, timing, and league data.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/feed/getGamesByIds
 *
 * @example
 * import { getGamesByIds } from '@azuro-org/toolkit'
 *
 * const games = await getGamesByIds({
 *   chainId: 137,
 *   gameIds: ['1006000000000080373237'],
 * })
 *
 * const gameData = games[0]
 * */
export const getGamesByIds = async (props: GetGamesByIdsParams): Promise<GetGamesByIdsResult> => {
  const gameIds = props.gameIds.filter(Boolean)

  if (!gameIds.length) {
    console.warn('getGamesByFilters: no gameIds provided, skipping request')

    return []
  }

  const api = getApiEndpoint(props.chainId)
  // const environment = environments[props.chainId]

  const response = await fetch(`${api}/market-manager/games-by-ids`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameIds,
    }),
  })

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetGamesByIdsResponse = await response.json()

  return data.games
}
