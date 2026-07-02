import type { ConditionCategory, ConditionState, OutcomeState, Selection } from '../../global'


export type MarketOutcome = {
  selectionName: string
  odds: number
  gameId: string
  isExpressForbidden: boolean
  isWon?: boolean
  hidden: boolean
  state: OutcomeState
} & Selection

export type MarketCondition = {
  conditionId: string
  state: ConditionState
  category: ConditionCategory
  sort: number
  margin: string
  hidden?: boolean
  isExpressForbidden: boolean
  outcomes: MarketOutcome[]
}

export type Market = {
  marketKey: string
  name: string
  description: string
  conditions: MarketCondition[]
  category: ConditionCategory
  type?: 'legacy' | 'v5'
}

export type GameMarkets = Market[]
