import { deBridgeUrl } from '../../config'


type SupportedTokensResponse = {
  tokens: Record<string, {
    address: string
    symbol: string,
    decimals: number,
    name: string,
    logoURI: string,
    tags: Array<string>
  }>
}

export const getDeBridgeSupportedTokens = async (chainId: number) => {
  const response = await fetch(`${deBridgeUrl}/token-list?chainId=${chainId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { tokens }: SupportedTokensResponse = await response.json()

  return tokens
}
