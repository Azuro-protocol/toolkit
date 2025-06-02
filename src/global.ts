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
  error?: string
}

export type BetClientData = {
  attention: string
  affiliate: Address
  core: Address
  expiresAt: number
  chainId: ChainId
  relayerFeeAmount: string
  isBetSponsored: boolean
  isFeeSponsored: boolean
  isSponsoredBetReturnable: boolean
}

export enum BonusType {
  FreeBet = 'FreeBet',
}

export enum BonusStatus {
  Used = 'Used',
  Available = 'Available',
}

export enum FreebetType {
  OnlyWin = 'OnlyWin',
  AllWin = 'AllWin',
}

export enum BetRestrictionType {
  Ordinar = 'Ordinar',
  Combo = 'Combo',
}

export enum EventRestrictionState {
  Live = 'Live',
  Prematch = 'Prematch',
}

type BonusBase = {
  id: string
  type: BonusType
  amount: string
  status: BonusStatus
  chainId: ChainId
  expiresAt: number
  usedAt: number
  createdAt: number
}

export type Freebet = {
  type: BonusType.FreeBet
  params: {
    isBetSponsored: boolean
    isFeeSponsored: boolean
    isSponsoredBetReturnable: boolean
  }
  settings: {
    type: FreebetType
    feeSponsored: boolean
    betRestriction: {
      type: BetRestrictionType | undefined
      minOdds: string
      maxOdds: string | undefined
    }
    eventRestriction: {
      state: EventRestrictionState | undefined
    }
    periodOfValidityMs: number
  }
} & BonusBase

export type Bonus = Freebet
