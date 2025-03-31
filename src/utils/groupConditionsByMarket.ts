import {
  dictionaries, getMarketKey, getMarketName,
  getMarketDescription, getSelectionName,
} from '@azuro-org/dictionaries'

import { type ConditionsQuery } from '../docs/feed/conditions'
import { ConditionState } from '../docs/feed/types'
import type { Selection } from '../global'


export type MarketOutcome = {
  selectionName: string
  odds: number
  gameId: string
  isExpressForbidden: boolean
  isWon?: boolean
} & Selection

type TMarket<C> = {
  marketKey: string
  name: string
  description: string
  conditions: C
}

type Condition = {
  conditionId: string
  state: ConditionState
  isExpressForbidden: boolean
  outcomes: MarketOutcome[]
}

export type Market = TMarket<Condition[]>

export type GameMarkets = Market[]

export const groupConditionsByMarket = (conditions: ConditionsQuery['conditions']): GameMarkets => {
  const sportId = conditions[0]!.game.sport.sportId
  const markets: Record<string, TMarket<Record<string, Condition>>> = {}

  const stateByOutcomeIds: Record<string, { conditionId: string, state: ConditionState }> = {}

  for (let conditionIndex = 0; conditionIndex < conditions.length; conditionIndex++) {
    const condition = conditions[conditionIndex]!

    const {
      conditionId,
      outcomes: rawOutcomes,
      state,
      wonOutcomeIds,
      isExpressForbidden,
      title: customMarketName,
      game: { gameId },
    } = condition

    const firstOutcomeId = rawOutcomes[0]!.outcomeId
    const marketKey = getMarketKey(firstOutcomeId)
    const marketName = customMarketName && customMarketName !== 'null' ? customMarketName : getMarketName({ outcomeId: firstOutcomeId })
    const marketDescription = getMarketDescription({ outcomeId: firstOutcomeId })

    // start checking duplicates
    const key = rawOutcomes.map(({ outcomeId }) => outcomeId).join('-')

    if (stateByOutcomeIds[key]) {
      if (state === ConditionState.Stopped) {
        continue
      }
      else if (stateByOutcomeIds[key].state === ConditionState.Stopped) {
        const removeConditionId = stateByOutcomeIds[key].conditionId
        stateByOutcomeIds[key] = {
          state,
          conditionId,
        }

        delete markets[marketKey]?.conditions[removeConditionId]
      }
    }
    else {
      stateByOutcomeIds[key] = {
        state,
        conditionId,
      }
    }

    // end checking duplicates

    if (!markets[marketKey]) {
      markets[marketKey] = {
        name: marketName,
        marketKey,
        description: marketDescription,
        conditions: {},
      }
    }

    markets[marketKey].conditions[conditionId] = {
      conditionId,
      state,
      isExpressForbidden,
      outcomes: [],
    }

    new Array(...rawOutcomes).sort((a, b) => {
      const { outcomes: dictionaryOutcomes } = dictionaries
      const left = dictionaryOutcomes[String(a.outcomeId)]!.selectionId
      const right = dictionaryOutcomes[String(b.outcomeId)]!.selectionId

      return left - right
    }).forEach((rawOutcome) => {
      const { outcomeId, odds, title: customSelectionName } = rawOutcome
      const betTypeOdd = dictionaries.outcomes[outcomeId]

      if (!betTypeOdd) {
        console.warn(`betTypeOdd not found for "outcomeId: ${outcomeId}"`)

        return
      }

      const selectionName = customSelectionName && customSelectionName !== 'null' ? customSelectionName : getSelectionName({ outcomeId, withPoint: true })

      const outcome: MarketOutcome = {
        conditionId,
        outcomeId,
        selectionName,
        gameId,
        isExpressForbidden,
        odds: +odds,
      }

      if (Array.isArray(wonOutcomeIds)) {
        outcome.isWon = wonOutcomeIds.includes(outcomeId)
      }

      markets[marketKey]!.conditions[conditionId]!.outcomes.push(outcome)
    })
  }

  const orderedMarketKeys = dictionaries.marketOrders?.[sportId]

  const result = Object.values(markets).map(market => {
    const { conditions } = market

    return {
      ...market,
      conditions: Object.values(conditions).sort((a, b) => {
        const { points, outcomes: dictionaryOutcomes } = dictionaries
        /*
          we should always sort by param in first outcome

          Handicap
          Team 1 (-2.5)   Team 2 (2.5)
          Team 1 (-1.5)   Team 2 (1.5)

          Total Goals
          Over (1.5)   Under (1.5)
          Over (2.5)   Under (2.5)
        */
        const aPointId = dictionaryOutcomes[String(a.outcomes[0]!.outcomeId)]!.pointsId!
        const bPointId = dictionaryOutcomes[String(b.outcomes[0]!.outcomeId)]!.pointsId!
        const aFirstOutcome = +points[aPointId]!
        const bFirstOutcome = +points[bPointId]!

        return aFirstOutcome - bFirstOutcome
      }),
    }
  })

  if (!orderedMarketKeys) {
    return result
  }

  return [ ...result ].sort((a, b) => {
    const prevMarketIndex = orderedMarketKeys.indexOf(a.marketKey)
    const nextMarketIndex = orderedMarketKeys.indexOf(b.marketKey)

    if (prevMarketIndex >= 0 && nextMarketIndex >= 0) {
      return prevMarketIndex - nextMarketIndex
    }

    if (prevMarketIndex < 0 && nextMarketIndex >= 0) {
      return 1
    }

    if (prevMarketIndex >= 0 && nextMarketIndex < 0) {
      return -1
    }

    return 0
  })
}
