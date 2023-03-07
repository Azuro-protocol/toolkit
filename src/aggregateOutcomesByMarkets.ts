import { getMarketKey, getMarketName, assembleSelectionName, type Dictionaries } from '@azuro-org/dictionaries'


type Outcome = {
  conditionId: string
  outcomeId: string
  selectionName: string
  lpAddress: string
  coreAddress: string
}

type Markets = {
  marketName: string
  outcomes: Outcome[][]
}[]

type Props = {
  lpAddress: string
  conditions: {
    [key: string]: any
    conditionId: string
    outcomes: {
      [key: string]: any
      outcomeId: string
    }[]
    core: {
      [key: string]: any
      address: string
    }
  }[]
  dictionaries: Dictionaries
}

export default function aggregateOutcomesByMarkets(props: Props): Markets {
  const { lpAddress, conditions, dictionaries } = props

  // group conditions by marketId
  const outcomesByMarketKey: Record<string, Outcome[]> = {}
  const result: Record<string, Markets[number]> = {}

  conditions.forEach(({ conditionId, outcomes, core }) => {
    outcomes.forEach(({ outcomeId }) => {
      const marketKey = getMarketKey(outcomeId, dictionaries)
      const marketName = getMarketName(outcomeId, dictionaries)
      const selectionName = assembleSelectionName(outcomeId, dictionaries)

      const outcome: Outcome = {
        conditionId,
        outcomeId,
        selectionName,
        lpAddress,
        coreAddress: core.address,
      }

      // it's important to use "marketKey" because it's unique
      // on other hand "marketId" can be same for different groups of conditions
      // "marketKey" is a string template "marketId-gamePeriodId-gameTypeId[-teamPlayerId]"
      if (!outcomesByMarketKey[marketKey]) {
        outcomesByMarketKey[marketKey] = []

        result[marketKey] = {
          marketName,
          outcomes: [],
        }
      }

      outcomesByMarketKey[marketKey].push(outcome)
    })
  })

  // sort by outcomeId and group by conditionId
  Object.keys(outcomesByMarketKey).forEach((marketKey) => {
    const marketId = +marketKey.split('-')[0]

    // get outcomes related to the market
    const outcomes = outcomesByMarketKey[marketKey] as Outcome[]

    // sort the conditions by selectionId (outcome)
    outcomes.sort((a, b) => {
      const left = dictionaries.outcomes[a.outcomeId].selectionId
      const right = dictionaries.outcomes[b.outcomeId].selectionId

      return left - right
    })

    // markets with different conditionIds and not require additional grouping or sorting
    const marketsWithDifferentConditionIds = [ 1, 2 ]

    if (marketsWithDifferentConditionIds.includes(marketId)) {
      result[marketKey].outcomes = [outcomes]
    }
    // group by conditionId to allow draw outcomes by rows in UI, e.g.
    //
    // Team 1 - Total Goals:
    // Over (1.5)   Under (1.5)
    // Over (0.5)   Under (0.5)
    else {
      const outcomesByConditionId: Record<string, Outcome[]> = {}

      outcomes.forEach((outcome) => {
        const key = outcome.conditionId

        if (!outcomesByConditionId[key]) {
          outcomesByConditionId[key] = []
        }

        outcomesByConditionId[key].push(outcome)
      })

      const outcomesArr: Outcome[][] = Object.values(outcomesByConditionId)

      result[marketKey].outcomes = outcomesArr.sort((a, b) => {
        const aSum = a.reduce((acc, { outcomeId }) => acc + +outcomeId, 0)
        const bSum = b.reduce((acc, { outcomeId }) => acc + +outcomeId, 0)

        return aSum - bSum
      })
    }
  })

  return Object.values(result)
}
