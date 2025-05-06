import { type ChainId, chainsData } from '../../config'


type GetPrecalculatedCashoutsResponse = {
  margin: string
  marginMin: string
  availables: {
    conditionId: string
    available: boolean
    outcomes: {
      outcomeId: number
      price: string
    }[]
  }[]
}

export type GetPrecalculatedCashouts = GetPrecalculatedCashoutsResponse | null

type Props = {
  chainId: ChainId
  conditionIds: string[]
}

export const getPrecalculatedCashouts = async (props: Props): Promise<GetPrecalculatedCashouts> => {
  const { chainId, conditionIds } = props
  const { api, contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const response = await fetch(`${api}/cashout/get-available`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conditionIds,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetPrecalculatedCashoutsResponse = await response.json()

  return data
}
