import { type ChainId, chainsData } from '../../config'


type GetPrecalculatedCashoutsResponse = {
  multipliers: {
    conditionId: string
    available: boolean
    outcomes: {
      outcomeId: number
      multiplier: string
    }[]
  }[]
}

export type GetPrecalculatedCashouts = GetPrecalculatedCashoutsResponse['multipliers'] | null

type Props = {
  chainId: ChainId
  conditionIds: string[]
}

export const getPrecalculatedCashouts = async (props: Props): Promise<GetPrecalculatedCashouts> => {
  const { chainId } = props
  const { api } = chainsData[chainId]

  const response = await fetch(`${api}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { multipliers }: GetPrecalculatedCashoutsResponse = await response.json()

  return multipliers
}
