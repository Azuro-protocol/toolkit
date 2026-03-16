import { getApiEndpoint } from '../getEndpoints'
import { serializeApiParams } from '../../helpers/serializeApiParams'
import type { ChainId } from '../../config'
import { environments } from '../../envs'
import type { PaginatedGamesResponse } from './types'


const minQueryLength = 3

export type SearchGamesParams = {
  chainId: ChainId
  /** minimum 3 characters long */
  query: string
  /** 1-based, default: 1 */
  page?: number
  /** 1-based, default: 10 */
  perPage?: number
}

export type SearchGamesResult = PaginatedGamesResponse

/**
 * Searches for games by text query across game titles, leagues, and countries.
 * The minimum query length is 3 characters. Returns paginated results.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/feed/searchGames
 *
 * @example
 * import { searchGames } from '@azuro-org/toolkit'
 *
 * const { games } = await searchGames({
 *   chainId: 137,
 *   query: 'Manchester',
 *   page: 1,
 *   perPage: 10,
 * })
 * */
export const searchGames = async (props: SearchGamesParams): Promise<SearchGamesResult> => {
  const query = props.query?.trim()

  if (query?.length < minQueryLength) {
    console.warn(`searchGames: query param must be at least ${minQueryLength} characters long, got: '${props.query}', skipping request`)

    return {
      games: [],
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 0,
    }
  }

  const api = getApiEndpoint(props.chainId)
  const environment = environments[props.chainId]
  const params = serializeApiParams({
    environment,
    request: props.query,
    page: props.page || 1,
    perPage: props.perPage || 10,
  })

  const response = await fetch(`${api}/market-manager/search?${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`searchGames API request failed: ${response.status} ${response.statusText}`)
  }

  const data: PaginatedGamesResponse = await response.json()

  return data
}
