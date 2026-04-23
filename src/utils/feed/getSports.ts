import { serializeApiParams } from '../../helpers/serializeApiParams'
import { getApiEndpoint } from '../getEndpoints'
import { environments } from '../../envs'
import { type GameState, OrderDirection } from '../../global'
import type { ChainId } from '../../config'
import { type GameData, GameOrderBy, type SportHubSlug } from './types'


export type GetSportsParams = {
  chainId: ChainId
  gameState: GameState.Live | GameState.Prematch
  sportIds?: (string | number) | (string | number)[]
  sportSlug?: string
  countrySlug?: string
  leagueSlug?: string
  /** Filter for leagues, if not set, returns all leagues */
  topLeagueFilter?: 'All' | 'TopOnly' | 'NonTop'
  /** Number of games per league, default and minimum: 10 */
  numberOfGames?: number
  orderBy?: GameOrderBy
  orderDir?: OrderDirection
}

export type SportData = {
  id: number
  slug: string
  name: string
  sportId: string
  turnover: string
  countries: {
    slug: string
    name: string
    turnover: string
    leagues: {
      slug: string
      name: string
      turnover: string
      isTopLeague: boolean
      games: GameData[]
    }[]
  }[]
}

type GetSportsResponse = {
  sports: SportData[]
}

export type GetSportsResult = GetSportsResponse['sports']


/**
 * Fetches a complete sports hierarchy including countries, leagues, and games.
 * Returns nested structure with all games organized by sport, country, and league.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/feed/getSports
 *
 * @example
 * import { GameState, getSports } from '@azuro-org/toolkit'
 *
 * const sports = await getSports({
 *   chainId: 137,
 *   states: [GameState.Prematch, GameState.Live],
 *   numberOfGames: 50,
 * })
 * */
export const getSports = async (props: GetSportsParams): Promise<GetSportsResult> => {
  const {
    chainId,
    gameState,
    sportIds,
    sportSlug,
    countrySlug,
    leagueSlug,
    numberOfGames,
    topLeagueFilter,
    orderBy = GameOrderBy.StartsAt,
    orderDir = OrderDirection.Asc,
  } = props

  const api = getApiEndpoint(chainId)
  const environment = environments[chainId]

  const params = serializeApiParams({
    environment,
    gameState,
    sportId: sportIds,
    sportSlug,
    countrySlug,
    leagueSlug,
    topLeagueFilter,
    numberOfGames: numberOfGames && numberOfGames > 10 ? numberOfGames : 10,
    orderBy,
    orderDirection: orderDir,
  })

  const response = await fetch(`${api}/market-manager/sports?${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetSportsResponse = await response.json()

  return data.sports
}
