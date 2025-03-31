import { type Address, type Hex } from 'viem'

import { chainsData } from '../config'
import { type CreateBetResponse, type BetClientData } from '../global'


type Props = {
  account: Address
  clientData: BetClientData
  bet: {
    conditionId: string | bigint
    outcomeId: string | number | bigint
    odds: string | bigint
    amount: string | bigint
    nonce: string | number | bigint
  }
  signature: Hex
}

export const createBet = async (props: Props) => {
  const { account, clientData, bet, signature } = props

  const { chainId } = clientData
  const { api, environment } = chainsData[chainId]

  const signedBet = {
    environment,
    bettor: account.toLowerCase(),
    betOwner: account.toLowerCase(),
    clientBetData: {
      clientData,
      bet: {
        conditionId: bet.conditionId,
        outcomeId: Number(bet.outcomeId),
        odds: bet.odds,
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

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: CreateBetResponse = await response.json()

  return data
}
