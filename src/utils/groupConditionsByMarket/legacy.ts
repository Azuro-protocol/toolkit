import {
  dictionaries, getMarketKey, getMarketName,
  getMarketDescription, getSelectionName,
} from '@azuro-org/dictionaries'

import type { ConditionDetailedData } from '../feed/getConditionsByGameIds'
import { ConditionState } from '../../global'
import type { Market, MarketOutcome } from './types'


type TCondition = {
  conditionId: string
  state: ConditionState
  margin: string
  hidden?: boolean
  isExpressForbidden: boolean
  outcomes: MarketOutcome[]
}

type DupEntry = { conditionId: string; state: ConditionState }

function pointSortValue(outcomeId: string): number {
  const pointsId = dictionaries.outcomes[outcomeId]?.pointsId

  if (pointsId == null) {
    return 0
  }

  return Number(dictionaries.points[pointsId] ?? 0)
}

export const groupLegacyConditions = (conditions: ConditionDetailedData[], sportId: string): Market[] => {
  const markets: Record<string, { marketKey: string; name: string; description: string; type: 'legacy', conditions: Record<string, TCondition> }> = {}
  const dupTracker: Record<string, DupEntry> = {}

  for (const condition of conditions) {
    const {
      conditionId,
      outcomes: rawOutcomes,
      state,
      wonOutcomeIds,
      isExpressForbidden,
      title: customMarketName,
      margin,
      hidden,
      game: { gameId },
    } = condition

    if (rawOutcomes.length === 0) {
      continue
    }

    const firstOutcomeId = rawOutcomes[0]!.outcomeId
    const marketKey = getMarketKey(firstOutcomeId)

    // ── deduplication ──
    const dupKey = rawOutcomes.map(({ outcomeId }) => outcomeId).join('-')
    const existing = dupTracker[dupKey]

    if (existing) {
      if (state === ConditionState.Stopped) {
        continue
      }
      else if (existing.state === ConditionState.Stopped) {
        delete markets[marketKey]?.conditions[existing.conditionId]
        dupTracker[dupKey] = { conditionId, state }
      }
    }
    else {
      dupTracker[dupKey] = { conditionId, state }
    }
    // ── end deduplication ──

    const marketName = customMarketName && customMarketName !== 'null'
      ? customMarketName
      : getMarketName({ outcomeId: firstOutcomeId })

    if (!markets[marketKey]) {
      markets[marketKey] = {
        marketKey,
        name: marketName,
        description: getMarketDescription({ outcomeId: firstOutcomeId }),
        conditions: {},
        type: 'legacy',
      }
    }

    markets[marketKey]!.conditions[conditionId] = {
      conditionId,
      state,
      isExpressForbidden,
      hidden,
      margin,
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

      const selectionName = customSelectionName && customSelectionName !== 'null'
        ? customSelectionName
        : getSelectionName({ outcomeId, withPoint: true })

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
        /*
          we should always sort by param in first outcome

          Handicap
          Team 1 (-2.5)   Team 2 (2.5)
          Team 1 (-1.5)   Team 2 (1.5)

          Total Goals
          Over (1.5)   Under (1.5)
          Over (2.5)   Under (2.5)
        */
        const aPoint = a.outcomes[0] ? pointSortValue(a.outcomes[0].outcomeId) : 0
        const bPoint = b.outcomes[0] ? pointSortValue(b.outcomes[0].outcomeId) : 0

        return aPoint - bPoint
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
