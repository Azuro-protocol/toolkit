import { type Address } from 'viem'


export type BuildSiweMessageParams = {
  domain: string
  address: Address
  uri: string
  chainId: number
  nonce: string
  issuedAt: number
  expiresAt?: number
  statement?: string
  version?: '1'
}

/**
 * Builds an EIP-4361 (Sign-In with Ethereum) message string ready for wallet signing.
 * Intended to be called between `getSiweNonce` and a wallet `signMessage` call, with the
 * resulting string passed verbatim to `signMessage` and then `verifySiwe`.
 *
 * The caller is responsible for passing an EIP-55 checksummed `address`; no normalisation
 * is applied internally. `issuedAt` and `expiresAt` are unix epoch milliseconds and are
 * formatted to ISO 8601 automatically. If `statement` is omitted the statement block is
 * dropped entirely. If `expiresAt` is omitted the `Expiration Time` line is omitted.
 *
 * @see https://eips.ethereum.org/EIPS/eip-4361
 *
 * @example
 * import { buildSiweMessage } from '@azuro-org/toolkit'
 *
 * const message = buildSiweMessage({
 *   domain: 'app.example.com',
 *   address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
 *   uri: 'https://app.example.com',
 *   chainId: 137,
 *   nonce: 'abc123',
 *   issuedAt: Date.now(),
 * })
 * */
export const buildSiweMessage = (p: BuildSiweMessageParams): string => {
  const { domain, address, uri, chainId, nonce, issuedAt, expiresAt, statement, version = '1' } = p

  const lines: string[] = [
    `${domain} wants you to sign in with your Ethereum account:`,
    address,
    '',
  ]

  if (statement !== undefined) {
    lines.push(statement, '')
  }

  lines.push(
    `URI: ${uri}`,
    `Version: ${version}`,
    `Chain ID: ${chainId}`,
    `Nonce: ${nonce}`,
    `Issued At: ${new Date(issuedAt).toISOString()}`
  )

  if (expiresAt !== undefined) {
    lines.push(`Expiration Time: ${new Date(expiresAt).toISOString()}`)
  }

  return lines.join('\n')
}
