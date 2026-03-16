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

/** a string in format `YYYY-MM-DDTHH:mm:ss.sssZ` */
export type ISOTimestamp = string

/**
 * Bet order states in the backend.
 *
 * Flow:
 * Created → Placed → Sent → (Accepted | Rejected) → Settled
 * Cancellation may occur at any point in the flow after "Created".
 *
 * To show aggregated states to the end user, use `getBetStatus` helper
 * */
export enum BetOrderState {
  /** First status when created */
  Created = 'Created',
  /** Bet is included in the calculation of potential loss/wins */
  Placed = 'Placed',
  /** The relayer has been taken into processing to send the bet to the contracts */
  Sent = 'Sent',
  /** Bet successfully accepted in the contracts */
  Accepted = 'Accepted',
  /** An error occurred during the contracts checks */
  Rejected = 'Rejected',
  /** The process of canceling the bet. The bet placed in the contracts still has the "GraphBetStatus.Accepted" status */
  PendingCancel = 'PendingCancel',
  /** Cancellation error. The bet placed in the contracts still has the "GraphBetStatus.Accepted" status */
  CancelFailed = 'CancelFailed',
  /** Bet is canceled */
  Canceled = 'Canceled',
  /** The bet is settled (won or lost) */
  Settled = 'Settled',
}

export enum BetOrderResult {
  Won = 'Won',
  Lost = 'Lost',
  Canceled = 'Canceled',
}

export enum GameState {
  Finished = 'Finished',
  Live = 'Live',
  Prematch = 'Prematch',
  Stopped = 'Stopped',
  Canceled = 'Canceled',
}

export enum ConditionState {
  Active = 'Active',
  Canceled = 'Canceled',
  Removed = 'Removed',
  Resolved = 'Resolved',
  Stopped = 'Stopped'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type CreateBetResponse = {
  id: string
  state: BetOrderState
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
  publicCustomData: Record<string, string> | null
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
      eventFilter?: {
        exclude: boolean
        filter: [
          {
            sportId: string
            leagues: string[]
            markets: {
              marketId: number
              gamePeriodId: number
              gameTypeId: number
            }[]
          }
        ]
      }
    }
    periodOfValidityMs: number
  }
} & BonusBase

export type Bonus = Freebet
