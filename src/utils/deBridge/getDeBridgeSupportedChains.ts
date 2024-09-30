import { deBridgeUrl } from '../../config'


type SupportedChainsResponse = {
  chains: {
    chainId: number
    originalChainId: number
    chainName: string
  }[]
}

export const deBridgeChainIdByOriginalChainId: Record<number, number> = {
  245022934: 100000001, // Neon
  100: 100000002, // Gnosis
  1890: 100000003, // LightLink
  1088: 100000004, // Metis
  7171: 100000005, // Bitrock
}

export type DeBridgeSupportedChains = SupportedChainsResponse['chains'] | null

export const getDeBridgeSupportedChains = async (): Promise<DeBridgeSupportedChains> => {
  const response = await fetch(`${deBridgeUrl}/supported-chains-info`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { chains }: SupportedChainsResponse = await response.json()

  return chains
}
