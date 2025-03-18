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
