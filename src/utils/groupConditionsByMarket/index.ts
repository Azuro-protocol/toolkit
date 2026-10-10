import type { ConditionDetailedData } from '../feed/getConditionsByGameIds'
import { groupLegacyConditions } from './legacy'
import { groupConditionsV5 } from './v5'
import { isExtendedConditionId } from '../isExtendedConditionId'
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
 * Extended conditions (see `isExtendedConditionId`) take the feed-titled (API-supplied titles) path;
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

  const { legacyConditions, extendedConditions } = conditions.reduce<{ legacyConditions: ConditionDetailedData[], extendedConditions: ConditionDetailedData[] }>((acc, condition) => {
    if (isExtendedConditionId(condition.conditionId)) {
      acc.extendedConditions.push(condition)
    }
    else {
      acc.legacyConditions.push(condition)
    }

    return acc
  }, { legacyConditions: [], extendedConditions: [] })

  const legacyMarkets = legacyConditions.length > 0
    ? groupLegacyConditions(legacyConditions, sportId)
    : []

  const markets = extendedConditions.length > 0
    ? groupConditionsV5(extendedConditions)
    : []

  return [ ...legacyMarkets, ...markets ].sort((a, b) => {
    return (a.conditions?.[0]?.sort || 0) - (b.conditions?.[0]?.sort || 0)
  })
}
