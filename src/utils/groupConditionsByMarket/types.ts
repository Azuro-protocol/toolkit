import type { ConditionState, Selection } from '../../global'


export type MarketOutcome = {
  selectionName: string
  odds: number
  gameId: string
  isExpressForbidden: boolean
  isWon?: boolean
} & Selection

type Condition = {
  conditionId: string
  state: ConditionState
  margin: string
  hidden?: boolean
  isExpressForbidden: boolean
  outcomes: MarketOutcome[]
}

export type Market = {
  marketKey: string
  name: string
  description: string
  conditions: Condition[]
  type?: 'legacy' | 'v5'
}

export type GameMarkets = Market[]
