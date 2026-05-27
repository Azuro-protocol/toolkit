import { type Address } from 'viem'

import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'
import { type Favorites } from './types'


export type GetUserFavoritesParams = {
  userId: Address
  affiliateId: Address
  chainId: ChainId
}

export type GetUserFavoritesResult = {
  favorites: Favorites
}

/**
 * Fetches the saved favorites (countries and leagues) for a given user + affiliate pair.
 * No authentication is required — the query is public.
 *
 * @example
 * import { getUserFavorites } from '@azuro-org/toolkit'
 *
 * const { favorites } = await getUserFavorites({
 *   userId: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
 *   affiliateId: '0x123...',
 *   chainId: 137,
 * })
 *
 * console.log(favorites.countries, favorites.leagues)
 * */
export const getUserFavorites = async (props: GetUserFavoritesParams): Promise<GetUserFavoritesResult> => {
  const { userId, affiliateId, chainId } = props

  if (!userId || !affiliateId) {
    throw new Error('getUserFavorites: userId and affiliateId are required')
  }

  const params = new URLSearchParams()
  params.append('userId', userId.toLowerCase())
  params.append('affiliateId', affiliateId.toLowerCase())

  const response = await fetch(`${getApiEndpoint(chainId)}/user/favorites?${params}`, {
    headers: {
      'Accept': 'application/json',
    },
  })

  const data: GetUserFavoritesResult & { errorMessage?: string; error?: string } = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
