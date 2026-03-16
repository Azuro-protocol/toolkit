import type { Address, Hex } from 'viem'

import type { BetConditionStatus, BetResult, GraphBetStatus, SelectionResult } from '../../docs'
import type { ConditionStatus } from '../../docs/bets/types'
import type { Environment } from '../../envs'
import type { BetOrderResult, BetOrderState, GameState, ISOTimestamp } from '../../global'


export type BetMetaData = {
  /* graph id: `coreAddress_betId` */
  id: string
  core: {
    type: 'V3'
    address: Address
    liquidityPool: {
      address: Address
      // bet token symbol - "USDT", "WETH", etc
      asset: string
    }
  }
  odds: string
  betId: string
  actor: Address
  owner: Address
  bettor: Address
  nonce: string
  amount: string
  payout: null | string
  result: BetResult | null
  status: GraphBetStatus
  rawOdds: string
  affiliate: Address
  rawAmount: string
  rawPayout: null | string
  isRedeemed: boolean
  selections: Array<{
    id: string
    odds: string
    result: SelectionResult | null
    outcome: {
      condition: {
        id: string
        gameId: string
        status: ConditionStatus
        outcomes: {
          result: SelectionResult | null
          outcomeId: string
          sortOrder: number
        }[]
        conditionId: string
        coreAddress: Address
        wonOutcomeIds: null | string[]
        _winningOutcomesCount: number
        createdBlockTimestamp: string
        resolvedBlockTimestamp: null | string
      },
      outcomeId: string
      sortOrder: number
    },
    rawOdds: string
    _outcomeId: string
  }>
  settledOdds: null | string
  createdTxHash: Hex
  // _conditionIds: string[]
  // _subBetsCount: number
  // _tokenDecimals: number
  rawSettledOdds: null | string
  potentialPayout: string
  potentialLossLimit: string
  rawPotentialPayout: string
  createdBlockTimestamp: string
  rawPotentialLossLimit: string
  resolvedBlockTimestamp: string | null
  isCashedOut: boolean
  isFreebetAmountReturnable: boolean | null
  paymasterContractAddress: Address | null
  redeemedTxHash: Hex | null
  cashout: null | {
    payout: string
  }
}

export type BetOrderConditionData = {
  conditionId: string
  outcomeId: number
  orderId: string
  gameId: string
  /**
   * State of the game at the moment of bet placing, to determine whether the bet is Live or not.
   * */
  gameState: GameState.Live | GameState.Prematch
  conditionMargin: string
  selectionMargin: string
  settledSelectionMargin: string | null
  result: BetConditionStatus | null
  /**
   * Formatted odds of the condition, e.g. "1.55"
   * */
  price: string
  /**
   * Formatted amount,
   * e.g. "18.5"
   *
   * in COMBO bets, it can have more fractional digits than bet token decimals,
   * e.g. "18.057553956834532374" for 6 decimals USDT
   * */
  potentialAmount: string | null
  potentialLoss: string | null
}

export type BetOrderData = {
  /** bettorAddressLowerCase_nonce */
  id: string
  state: BetOrderState
  environment: Environment
  betType: 'ORDINARY' | 'COMBO'
  core: Address
  bettor: Address
  owner: Address
  affiliate: Address
  amount: number
  payout: number | null
  odds: number
  bonusId: string | null
  isFreebet: boolean
  isSponsoredBetReturnable?: boolean
  betId: number | null
  txHash: Hex | null
  margin: string
  settledMargin: string | null
  result: BetOrderResult | null
  createdAt: ISOTimestamp
  updatedAt: ISOTimestamp
  settledAt: ISOTimestamp | null
  redeemedAt: ISOTimestamp | null
  conditions: BetOrderConditionData[]
  meta: BetMetaData | null

  error: string | null
  errorMessage: string | null
}
