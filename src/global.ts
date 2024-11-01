import { type Address } from 'viem'

import { type ChainId } from './config'


export type Selection = {
  outcomeId: string
  conditionId: string
  coreAddress: string
}

export type WaveId = number | 'active'

export type LiveBet = {
  attention: string
  affiliate: Address
  core: Address
  amount: string
  chainId: ChainId
  conditionId: string
  outcomeId: number
  minOdds: string
  nonce: string
  expiresAt: number
  relayerFeeAmount: string
}
