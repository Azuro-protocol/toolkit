import { deBridgeUrl } from '../../config'


type SupportedChainsResponse = {
  chains: {
    chainId: number
    chainName: string
  }[]
}

export const getDeBridgeSupportedChains = async () => {
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
