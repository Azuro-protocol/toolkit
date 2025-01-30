import { type Address, type Hex } from 'viem'

import { type ChainId, chainsData } from '../config'
import { type LiveBet } from '../global'


export enum LiveBetState {
  Created = 'Created',
  Pending = 'Pending',
  Sent = 'Sent',
  Accepted = 'Accepted',
  Rejected = 'Rejected'
}

export type CreateLiveBetResponse = {
  id: string
  state: LiveBetState
  errorMessage?: string
}

type Props = {
  chainId: ChainId
  account: Address
  bet: LiveBet
  signature: Hex
}

export const createLiveBet = async (props: Props) => {
  const { chainId, account, bet, signature } = props

  const { api, environment, contracts } = chainsData[chainId]

  if (!contracts.liveCore) {
    throw new Error('provided chainId is not supported for live bet')
  }

  const order = { bet }

  const signedBet = {
    environment,
    bettor: account.toLowerCase(),
    data: order,
    bettorSignature: signature,
  }

  const response = await fetch(`${api}/orders`, {
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

  const data: CreateLiveBetResponse = await response.json()

  return data
}
