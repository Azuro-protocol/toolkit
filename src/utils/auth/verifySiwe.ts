import { type Address, type Hex } from 'viem'

import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'


export type VerifySiweParams = {
  chainId: ChainId
  message: string
  signature: Hex
}

export type VerifySiweResult = {
  token: string
  expiresIn: number
  address: Address
  affiliateId: Address
  chainId: ChainId
}

/**
 * Verifies a signed SIWE message and returns a JWT valid for `expiresIn` seconds.
 * The call is single-use: the nonce embedded in the message is consumed upon success.
 * `chainId` is used only to resolve the API endpoint and is not included in the request body.
 *
 * @example
 * import { verifySiwe } from '@azuro-org/toolkit'
 *
 * const { token, expiresIn } = await verifySiwe({
 *   chainId: 137,
 *   message: siweMessage,
 *   signature: '0x...',
 * })
 * */
export const verifySiwe = async (props: VerifySiweParams): Promise<VerifySiweResult> => {
  const { chainId, message, signature } = props

  const response = await fetch(`${getApiEndpoint(chainId)}/auth/siwe/verify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, signature }),
  })

  const data: VerifySiweResult & { errorMessage?: string; error?: string } = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
