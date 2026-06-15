import { getMarketName, getSelectionName } from '@azuro-org/dictionaries'

import { getApiEndpoint } from '../getEndpoints'
import { calcMinOdds } from '../calcMinOdds'
import { environments } from '../../envs'
import type { OutcomeData } from './getConditionsByGameIds'
import type { GameData } from './types'
import type { ConditionState } from '../../global'
import type { ChainId } from '../../config'


export type GetPredefinedComboParams = {
  chainId: ChainId
}

type PredefinedComboConditionDataApi = {
  id: string
  conditionId: string
  state: ConditionState
  title: string | null
  isPrematchEnabled: boolean
  isLiveEnabled: boolean
  hidden?: boolean
  outcomes: OutcomeData
  game: GameData
}

export type PredefinedComboConditionData = {
  id: string
  conditionId: string
  state: ConditionState
  title: string
  isPrematchEnabled: boolean
  isLiveEnabled: boolean
  hidden?: boolean
  outcome: OutcomeData
  game: GameData
  isExpressForbidden: boolean
}

type PredefinedComboDataApi = {
  conditions: PredefinedComboConditionDataApi[]
}

export type PredefinedComboData = {
  conditions: PredefinedComboConditionData[]
  totalOdds: string
}

type GetPredefinedComboResponse = {
  comboData: PredefinedComboDataApi[]
}

export type GetPredefinedComboResult = PredefinedComboData[]


/**
 * Fetches the curated set of predefined combo bets for the chain's environment.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/feed/getPredefinedCombo
 *
 * @example
 * import { getPredefinedCombo } from '@azuro-org/toolkit'
 *
 * const combos = await getPredefinedCombo({ chainId: 137 })
 * */
export const getPredefinedCombo = async (props: GetPredefinedComboParams): Promise<GetPredefinedComboResult> => {
  const api = getApiEndpoint(props.chainId)
  const environment = environments[props.chainId]

  const searchParams = new URLSearchParams({ environment })

  const response = await fetch(`${api}/market-manager/predefined-combo?${searchParams}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`getPredefinedCombo API request failed: ${response.status} ${response.statusText}`)
  }

  const data: GetPredefinedComboResponse = await response.json()

  return data.comboData.map((item) => {
    const oddsList: number[] = []
    const conditions = item.conditions.map((item) => {
      const { outcomes: outcome, ...rest } = item

      oddsList.push(+outcome.odds)

      const isV5 = item.conditionId[0] === '5'
      const title = item.title ?? (isV5 ? 'Unknown' : getMarketName({ outcomeId: outcome.outcomeId }))
      const outcomeTitle = outcome.title ?? (isV5 ? 'Unknown' : getSelectionName({ outcomeId: outcome.outcomeId }))

      return {
        ...rest,
        title,
        outcome: {
          ...outcome,
          title: outcomeTitle,
        },
        isExpressForbidden: false,
      }
    })

    const totalOdds = calcMinOdds({ odds: oddsList })

    return {
      conditions,
      totalOdds,
    }
  })
}
