import { type Address, type Hex } from 'viem'

import { chainsData } from '../config'
import { type CreateBetResponse, type BetClientData } from '../global'


type Props = {
  account: Address
  clientData: BetClientData
  bet: {
    conditionId: string | bigint
    outcomeId: string | number | bigint
    minOdds: string | bigint
    amount: string | bigint
    nonce: string | number | bigint
  }
  signature: Hex
  bonusId?: string
}

export const createBet = async (props: Props) => {
  const { account, clientData, bet, signature, bonusId } = props

  const { chainId } = clientData
  const { api, environment } = chainsData[chainId]

  const signedBet = {
    environment,
    bonusId,
    bettor: account.toLowerCase(),
    betOwner: account.toLowerCase(),
    clientBetData: {
      clientData,
      bet: {
        conditionId: String(bet.conditionId),
        outcomeId: Number(bet.outcomeId),
        minOdds: String(bet.minOdds),
        amount: String(bet.amount),
        nonce: String(bet.nonce),
      },
    },
    bettorSignature: signature,
  }

  const response = await fetch(`${api}/bet/orders/ordinar`, {
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
