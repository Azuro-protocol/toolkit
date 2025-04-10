import { type Address, type Chain } from 'viem'

import { type Environment } from './envs'
import { type Contracts } from './utils/setupContracts'
import { type ChainId } from './config'


type BetToken = {
  address: Address
  symbol: string
  decimals: number
}

export type ChainData = {
  chain: Omit<Chain, 'id'> & { id: ChainId }
  graphql: {
    bets: string
    feed: string
    /**
      * @deprecated Only for v2 feed
    */
    legacyLive: string
  }
  socket: string
  api: string
  environment: Environment
  contracts: Contracts
  betToken: BetToken
}

export type Selection = {
  outcomeId: string
  conditionId: string
}

export type WaveId = number | 'active'

export enum BetState {
  Created = 'Created',
  Pending = 'Pending',
  Sent = 'Sent',
  Accepted = 'Accepted',
  Rejected = 'Rejected'
}

export type CreateBetResponse = {
  id: string
  state: BetState
  errorMessage?: string
}

export type BetClientData = {
  attention: string
  affiliate: Address
  core: Address
  expiresAt: number
  chainId: ChainId
  relayerFeeAmount: string
}
