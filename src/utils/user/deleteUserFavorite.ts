import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'


export type DeleteUserFavoriteParams = {
  chainId: ChainId
  token: string
  favoritesId: string
}

export type DeleteUserFavoriteResult = {
  favoritesId: string
  success: boolean
}

/**
 * Deletes a user favorite by its ID via an authenticated DELETE request.
 * Requires a valid Bearer JWT obtained from `verifySiwe`.
 *
 * - Auth: `Authorization: Bearer <token>` (see {@link https://gem.azuro.org/hub/apps/toolkit/auth/verifySiwe verifySiwe})
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/user/deleteUserFavorite
 *
 * @example
 * import { deleteUserFavorite } from '@azuro-org/toolkit'
 *
 * const { success } = await deleteUserFavorite({
 *   chainId: 137,
 *   token: jwtToken,
 *   favoritesId: 'abc-123',
 * })
 *
 * console.log(success) // true
 * */
export const deleteUserFavorite = async (props: DeleteUserFavoriteParams): Promise<DeleteUserFavoriteResult> => {
  const { chainId, token, favoritesId } = props

  const response = await fetch(`${getApiEndpoint(chainId)}/user/favorites/${encodeURIComponent(favoritesId)}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  const data: DeleteUserFavoriteResult & { errorMessage?: string; error?: string } = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
