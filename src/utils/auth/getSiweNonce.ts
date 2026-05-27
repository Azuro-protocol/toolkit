import { type Address } from 'viem'

import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'


export type GetSiweNonceParams = {
  address: Address
  affiliateId: Address
  chainId: ChainId
  domain: string
  uri: string
}

export type GetSiweNonceResult = {
  nonce: string
  issuedAt: number
  expiresAt: number
}

/**
 * Requests a SIWE (Sign-In with Ethereum) nonce for the given (address, affiliateId, chainId) tuple.
 * The returned nonce is single-use and expires in approximately 5 minutes server-side.
 * Pass the result to `buildSiweMessage` and then `verifySiwe` to complete authentication.
 *
 * @example
 * import { getSiweNonce } from '@azuro-org/toolkit'
 *
 * const { nonce, issuedAt, expiresAt } = await getSiweNonce({
 *   address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
 *   affiliateId: '0x123...',
 *   chainId: 137,
 *   domain: 'app.example.com',
 *   uri: 'https://app.example.com',
 * })
 * */
export const getSiweNonce = async (props: GetSiweNonceParams): Promise<GetSiweNonceResult> => {
  const { address, affiliateId, chainId, domain, uri } = props

  const response = await fetch(`${getApiEndpoint(chainId)}/auth/siwe/nonce`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address, affiliateId, chainId, domain, uri }),
  })

  const data: GetSiweNonceResult & { errorMessage?: string; error?: string } = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
