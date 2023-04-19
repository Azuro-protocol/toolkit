import { getMarketKey, getMarketName, getSelectionName, dictionaries } from '@azuro-org/dictionaries'


type Outcome<T> = T & {
  conditionId: string
  outcomeId: string
  selectionName: string
  lpAddress: string
  coreAddress: string
}

type Market<T> = {
  marketName: string
  outcomes: Outcome<T>[]
}

type FinalMarket<T> = {
  marketName: string
  outcomes: Outcome<T>[][]
}

type Props = {
  lpAddress: string
  conditions: {
    [key: string]: any
    conditionId: string
    coreAddress: string
    outcomes: {
      [key: string]: any
      outcomeId: string
    }[]
  }[]
}

export default function aggregateOutcomesByMarkets<T extends {}>(props: Props): FinalMarket<T>[] {
  const { lpAddress, conditions } = props

  const marketsMap: Record<string, Market<T>> = {}

  conditions.forEach(({ conditionId, outcomes, coreAddress }) => {
    outcomes.forEach(({ outcomeId, ...rest }) => {
      // we are using the same key format that was discussed earlier
      const marketKey = getMarketKey(outcomeId)

      // we are obtaining the human-readable names of each market and the corresponding outcome selections
      const marketName = getMarketName({ outcomeId })
      const selectionName = getSelectionName({ outcomeId })

      const outcome: Outcome<T> = {
        conditionId,
        outcomeId,
        lpAddress,
        coreAddress,
        selectionName,
        ...rest as any
      }

      if (!marketsMap[marketKey]) {
        marketsMap[marketKey] = {
          marketName,
          outcomes: [],
        }
      }

      marketsMap[marketKey].outcomes.push(outcome)
    })
  })

  const finalMarketsMap: Record<string, FinalMarket<T>> = {}

  // sort by outcomeId and group by conditionId
  Object.keys(marketsMap).forEach((marketKey) => {
    const { marketName, outcomes } = marketsMap[marketKey]

    finalMarketsMap[marketKey] = {
      marketName,
      outcomes: null as any,
    }

    // sort the outcomes by `selectionId` (outcome's selection reference)
    outcomes.sort((a, b) => {
      const left = dictionaries.outcomes[a.outcomeId].selectionId
      const right = dictionaries.outcomes[b.outcomeId].selectionId

      return left - right
    })

    // "Full Time Result" and "Double Chance" are the markets whose outcomes don't require sorting
    const MARKETS_THAT_DONT_NEED_GROUPING = [ 1, 2 ]
    const marketId = marketKey.split('-')[0]

    if (MARKETS_THAT_DONT_NEED_GROUPING.includes(+marketId)) {
      // it's worth noting that the outcomes are wrapped within an array here due to the "rows" that are presented below
      finalMarketsMap[marketKey].outcomes = [ outcomes ]
    }
    else {
      // group the outcomes by condition ID, which will allow us to display the draw outcomes in separate rows
      //
      // Handicap:
      // H1 (-0.5)  H2 (0.5)
      // H1 (0.5)   H2 (-0.5)
      const outcomesByConditionId: Record<string, Outcome<T>[]> = {}

      outcomes.forEach((outcome) => {
        const key = outcome.conditionId

        if (!outcomesByConditionId[key]) {
          outcomesByConditionId[key] = []
        }

        outcomesByConditionId[key].push(outcome)
      })

      const rows: Outcome<T>[][] = Object.values(outcomesByConditionId)

      finalMarketsMap[marketKey].outcomes = rows.sort((a, b) => {
        const aSum = a.reduce((acc, { outcomeId }) => acc + +outcomeId, 0)
        const bSum = b.reduce((acc, { outcomeId }) => acc + +outcomeId, 0)

        return aSum - bSum
      })
    }
  })

  return Object.values(finalMarketsMap)
}
