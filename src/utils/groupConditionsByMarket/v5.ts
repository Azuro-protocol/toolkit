import type { ConditionCategory } from '../../global'
import type { ConditionDetailedData } from '../feed/getConditionsByGameIds'
import type { Market, MarketOutcome, MarketCondition } from './types'
import { parseSort } from './parseSort'


function marketGroupKey(condition: ConditionDetailedData): string {
  const { marketId, marketVarietyId } = condition

  if (marketId != null) {
    return `${marketId}_${marketVarietyId}`
  }

  return condition.conditionId
}

export const groupConditionsV5 = (conditions: ConditionDetailedData[]): Market[] => {
  const groupOrder: string[] = []
  const groups: Record<string, {
    name: string
    conditions: Record<string, MarketCondition>
    category: ConditionCategory
    conditionSorts: Record<string, number>
  }> = {}

  for (const condition of conditions) {
    const {
      conditionId,
      outcomes: rawOutcomes,
      state,
      wonOutcomeIds,
      isExpressForbidden,
      title,
      margin,
      hidden,
      game: { gameId },
      category,
      sort,
    } = condition

    const gKey = marketGroupKey(condition)
    const marketName = title && title !== 'null' ? title : conditionId

    if (!groups[gKey]) {
      groupOrder.push(gKey)
      groups[gKey] = { name: marketName, conditions: {}, conditionSorts: {}, category }
    }

    const sortedOutcomes = [ ...rawOutcomes ].sort(
      (a, b) => parseSort(a.sort) - parseSort(b.sort)
    )

    groups[gKey]!.conditionSorts[conditionId] = parseSort(sortedOutcomes[0]?.sort)

    const processedOutcomes: MarketOutcome[] = sortedOutcomes.map(outcomeData => {
      const selectionName = outcomeData.title && outcomeData.title !== 'null' ? outcomeData.title : outcomeData.outcomeId

      const outcome: MarketOutcome = {
        outcomeId: outcomeData.outcomeId,
        conditionId,
        selectionName,
        odds: Number(outcomeData.odds),
        gameId,
        isExpressForbidden,
        hidden: outcomeData.hidden,
        state: outcomeData.state,
      }

      if (Array.isArray(wonOutcomeIds)) {
        outcome.isWon = wonOutcomeIds.includes(outcomeData.outcomeId)
      }

      return outcome
    })

    groups[gKey]!.conditions[conditionId] = {
      conditionId,
      sort: parseSort(sort),
      state,
      hidden,
      margin,
      category,
      isExpressForbidden,
      outcomes: processedOutcomes,
    }
  }

  return groupOrder.map(gKey => {
    const group = groups[gKey]!

    const sortedConditions = Object.values(group.conditions).sort(
      (a, b) => (
        group.conditionSorts[a.conditionId] ?? 0
      ) - (
        group.conditionSorts[b.conditionId] ?? 0
      )
    )

    return {
      marketKey: gKey,
      name: group.name,
      description: '',
      category: group.category,
      conditions: sortedConditions,
      type: 'v5',
    }
  })
}
