import { type Address, type Hex } from 'viem'

import { chainsData } from '../config'
import { type CreateBetResponse, type BetClientData } from '../global'


type Props = {
  account: Address
  amount: string | bigint
  minOdds: string | bigint
  nonce: string | number | bigint
  clientData: BetClientData
  bets: {
    conditionId: string | bigint
    outcomeId: string | number | bigint
  }[]
  signature: Hex
  bonusId?: string
}

export const createComboBet = async (props: Props) => {
  const { account, amount, minOdds, nonce, clientData, bets, signature, bonusId } = props

  const { chainId } = clientData
  const { api, environment } = chainsData[chainId]

  const signedBet = {
    environment,
    bonusId,
    bettor: account.toLowerCase(),
    betOwner: account.toLowerCase(),
    clientBetData: {
      clientData,
      amount: String(amount),
      minOdds: String(minOdds),
      nonce: String(nonce),
      bets: bets.map(bet => ({
        conditionId: String(bet.conditionId),
        outcomeId: Number(bet.outcomeId),
      })),
    },
    bettorSignature: signature,
  }

  const response = await fetch(`${api}/bet/orders/combo`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signedBet),
  })

  if (response.status === 404) {
    return null
  }

  const data: CreateBetResponse = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
