import type { ConditionDetailedData } from '../feed/getConditionsByGameIds'
import { groupLegacyConditions } from './legacy'
import { groupConditionsV5 } from './v5'
import type { GameMarkets } from './types'


export type {
  GameMarkets,
  MarketOutcome,
  MarketCondition,
  Market,
} from './types'

/**
 * Groups game conditions by their market types and sorts them according to sport-specific ordering.
 * It processes outcomes to include selection names, handles duplicate conditions, and organizes data for display.
 * Conditions whose conditionId begins with '5' use the modern (API-supplied titles) path;
 * all others use the legacy (dictionary-resolved names) path.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/utils/groupConditionsByMarket
 *
 * @example
 * import { groupConditionsByMarket } from '@azuro-org/toolkit'
 *
 * const conditions = await getConditionsByGameIds({ gameIds: ['123'] })
 * const markets = groupConditionsByMarket(conditions)
 *
 * markets.forEach(market => {
 *   console.log(market.name) // e.g., "Match Winner", "Total Goals"
 *   market.conditions.forEach(condition => {
 *     console.log(condition.outcomes) // outcomes with odds and selection names
 *   })
 * })
 * */
export const groupConditionsByMarket = (conditions: ConditionDetailedData[]): GameMarkets => {
  if (!conditions?.length) {
    return []
  }

  const sportId = conditions[0]!.game.sport.sportId

  const { legacyConditions, conditionsV5 } = conditions.reduce<{ legacyConditions: ConditionDetailedData[], conditionsV5: ConditionDetailedData[] }>((acc, condition) => {
    if (condition.conditionId[0] === '5') {
      acc.conditionsV5.push(condition)
    }
    else {
      acc.legacyConditions.push(condition)
    }

    return acc
  }, { legacyConditions: [], conditionsV5: [] })

  const legacyMarkets = legacyConditions.length > 0
    ? groupLegacyConditions(legacyConditions, sportId)
    : []

  const markets = conditionsV5.length > 0
    ? groupConditionsV5(conditionsV5)
    : []

  return [ ...legacyMarkets, ...markets ].sort((a, b) => {
    return (a.conditions?.[0]?.sort || 0) - (b.conditions?.[0]?.sort || 0)
  })
}
