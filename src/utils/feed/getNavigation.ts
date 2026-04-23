import { getApiEndpoint } from '../getEndpoints'
import { serializeApiParams } from '../../helpers/serializeApiParams'
import { environments } from '../../envs'
import type { ChainId } from '../../config'
import type { SportHubSlug } from './types'


export type GetNavigationParams = {
  chainId: ChainId
  sportHub?: SportHubSlug
  sportIds?: string | number | (string | number)[]
}

type NavigationSportDataResponse = {
  id: number
  slug: string
  name: string
  sportId: string
  sportHub: {
    id: string
    slug: SportHubSlug
  }
  activeGamesCount: number
  activeLiveGamesCount: number
  activePrematchGamesCount: number
  countries: {
    id: string
    slug: string
    name: string
    turnover: string
    activeGamesCount: number
    activeLiveGamesCount: number
    activePrematchGamesCount: number
    leagues: {
      id: string
      slug: string
      name: string
      isTopLeague: boolean
      turnover: string
      activeGamesCount: number
      activeLiveGamesCount: number
      activePrematchGamesCount: number
    }[]
  }[]
}

export type NavigationSportData = Omit<NavigationSportDataResponse, 'sportHub'> & {
  sporthub: {
    id: string
    slug: SportHubSlug
  }
}

type GetNavigationResponse = {
  sports: NavigationSportDataResponse[]
}

export type GetNavigationResult = NavigationSportData[]

/**
 * Fetches navigation structure with sports, countries, and leagues hierarchy.
 * Returns active game counts at each level for building navigation menus.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/feed/getNavigation
 *
 * @example
 * import { getNavigation } from '@azuro-org/toolkit'
 *
 * const sports = await getNavigation({
 *   chainId: 137,
 *   sportHub: 'sports',
 * })
 * */
export const getNavigation = async (props: GetNavigationParams): Promise<GetNavigationResult> => {
  const { chainId, sportIds, sportHub } = props

  const api = getApiEndpoint(chainId)
  const environment = environments[chainId]

  const params = serializeApiParams({
    environment,
    sportHub,
    sportIds,
  })

  const response = await fetch(`${api}/market-manager/navigation?${params}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`getNavigation API request failed: ${response.status} ${response.statusText}`)
  }

  const data: GetNavigationResponse = await response.json()

  return data.sports.map(({ sportHub, ...rest }) => {
    return {
      ...rest,
      // to align with previous graphql based versions
      sporthub: sportHub,
    }
  })
}
