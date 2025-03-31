import { type ChainId, chainsData } from '../config'
import { type Selection } from '../global'


export type GetMaxBetResponse = {
  maxBet: string
  maxPayout: string
}

type Props = {
  chainId: ChainId
  selections: Selection[]
}

export const getMaxBet = async (props: Props) => {
  const { chainId, selections } = props

  const { api, environment } = chainsData[chainId]

  const response = await fetch(`${api}/bet/calculation`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bets: selections.map(({ conditionId, outcomeId }) => ({
        conditionId,
        outcomeId: +outcomeId,
      })),
      environment,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetMaxBetResponse = await response.json()

  return data
}
