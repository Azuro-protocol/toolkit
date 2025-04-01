import { type Address, type Hex } from 'viem'

import { chainsData } from '../config'
import { type CreateBetResponse, type BetClientData } from '../global'


type Props = {
  account: Address
  amount: string | bigint
  minOdds: string | bigint
  nonce: string | number | bigint
  clientData: BetClientData
  bet: {
    conditionId: string | bigint
    outcomeId: string | number | bigint
  }
  signature: Hex
}

export const createComboBet = async (props: Props) => {
  const { account, amount, minOdds, nonce, clientData, bet, signature } = props

  const { chainId } = clientData
  const { api, environment } = chainsData[chainId]

  const signedBet = {
    environment,
    bettor: account.toLowerCase(),
    betOwner: account.toLowerCase(),
    clientBetData: {
      clientData,
      amount,
      minOdds: String(minOdds),
      nonce: String(nonce),
      bet: {
        conditionId: String(bet.conditionId),
        outcomeId: Number(bet.outcomeId),
      },
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

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: CreateBetResponse = await response.json()

  return data
}
