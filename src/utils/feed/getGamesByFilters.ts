import type { ChainId } from '../../config'
import { environments } from '../../envs'
import { type GameState, OrderDirection } from '../../global'
import { serializeApiParams } from '../../helpers/serializeApiParams'
import { getApiEndpoint } from '../getEndpoints'
import { GameOrderBy, type PaginatedGamesResponse, type SportHubSlug } from './types'


export type GetGamesByFiltersParams = {
  chainId: ChainId
  state: GameState.Live | GameState.Prematch
  sportHub?: SportHubSlug
  sportIds?: string | number | (string | number)[]
  sportSlug?: string
  leagueSlug?: string

  // conditionsState?: ConditionState.Active | ConditionState.Stopped

  orderBy?: GameOrderBy
  orderDir?: OrderDirection
  /** 1-based, default: 1 */
  page?: number
  /** 1-based, default: 100 */
  perPage?: number
}

export type GetGamesByFiltersResult = PaginatedGamesResponse

/**
 * Fetches games by applying various filters such as sport, league, or game state.
 * Returns paginated results ideal for building sport/country/league listing pages.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/feed/getGamesByFilters
 *
 * @example
 * import { GameState, getGamesByFilters } from '@azuro-org/toolkit'
 *
 * const games = await getGamesByFilters({
 *   chainId: 137,
 *   state: GameState.Prematch,
 *   page: 2,
 *   perPage: 50,
 * })
 * */
export const getGamesByFilters = async (props: GetGamesByFiltersParams): Promise<GetGamesByFiltersResult> => {
  const { chainId, leagueSlug, sportSlug, sportHub, orderBy, orderDir, sportIds, page, perPage, state } = props

  const api = getApiEndpoint(chainId)
  const environment = environments[chainId]

  const params = serializeApiParams({
    environment,
    gameState: state,
    sportId: sportIds,
    sportSlug,
    leagueSlug,
    sportHub,
    // conditionState: props.conditionsState,
    orderBy: orderBy || GameOrderBy.StartsAt,
    orderDirection: orderDir || OrderDirection.Asc,
    perPage: perPage || 100,
    page: page || 1,
  })

  const response = await fetch(`${api}/market-manager/games-by-filters?${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`getGamesByFilters API request failed: ${response.status} ${response.statusText}`)
  }

  const data: PaginatedGamesResponse = await response.json()

  return data
}
