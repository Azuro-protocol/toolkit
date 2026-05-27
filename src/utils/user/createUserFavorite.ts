import { type Address } from 'viem'

import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'


export type CreateUserFavoriteParams = {
  chainId: ChainId
  token: string
  country: string
  league?: string
  sportId: number
}

export type CreateUserFavoriteResult = {
  favoritesId: string
  userId: Address
  affiliateId: Address
  country: string
  league: string | null
  sportId: number
  createdAt: string
}

/**
 * Creates a user favorite (entire country isolated by sport, or exact league) via an authenticated POST request.
 * Requires a valid Bearer JWT obtained from `verifySiwe` — the server derives `userId` and
 * `affiliateId` from the token, so they must not be passed in the body.
 *
 * - Auth: `Authorization: Bearer <token>` (see {@link https://gem.azuro.org/hub/apps/toolkit/auth/verifySiwe verifySiwe})
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/user/createUserFavorite
 *
 * @example
 * import { createUserFavorite } from '@azuro-org/toolkit'
 *
 * const result = await createUserFavorite({
 *   chainId: 137,
 *   token: jwtToken,
 *   country: 'England',
 *   league: 'Premier League',
 *   sportId: 33,
 * })
 *
 * console.log(result.favoritesId)
 * */
export const createUserFavorite = async (props: CreateUserFavoriteParams): Promise<CreateUserFavoriteResult> => {
  const { chainId, token, country, league, sportId } = props

  const response = await fetch(`${getApiEndpoint(chainId)}/user/favorites`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ country, league, sportId }),
  })

  const data: CreateUserFavoriteResult & { errorMessage?: string; error?: string } = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
