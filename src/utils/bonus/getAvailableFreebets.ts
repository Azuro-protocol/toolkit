import { formatUnits, type Address } from 'viem'

import { chainsData, chainsDataByEnv, type ChainId } from '../../config'
import { BonusType, type Freebet, type Selection } from '../../global'
import { type Environment } from '../../envs'
import { type RawBonus } from './getBonuses'


export type GetFreebetsResponse = {
  bonuses: RawBonus[]
}

type Props = {
  chainId: ChainId
  account: Address
  affiliate: Address
  selections: Selection[]
}

export type GetAvailableFreebets = Freebet[] | null

export const getAvailableFreebets = async ({ chainId, account, affiliate, selections }: Props): Promise<GetAvailableFreebets> => {
  const { api, environment, betToken } = chainsData[chainId]

  const response = await fetch(`${api}/bonus/freebet/get-available`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      environment,
      bettorAddress: account,
      poolAddress: affiliate,
      selections: selections.map(selection => ({
        conditionId: selection.conditionId,
        outcomeId: +selection.outcomeId,
      })),
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { bonuses }: GetFreebetsResponse = await response.json()

  return bonuses.map<Freebet>(bonus => {
    const environment = `${bonus.network}${bonus.currency}` as Environment
    const {
      id,
      freebetParam: {
        isBetSponsored,
        isFeeSponsored,
        isSponsoredBetReturnable,
        settings,
      },
    } = bonus

    return {
      id,
      amount: formatUnits(BigInt(bonus.amount), betToken.decimals),
      type: BonusType.FreeBet,
      params: {
        isBetSponsored,
        isFeeSponsored,
        isSponsoredBetReturnable,
      },
      settings: {
        type: settings.bonusType,
        feeSponsored: settings.feeSponsored,
        betRestriction: {
          type: settings.betRestriction.betType === 'All' ? undefined : settings.betRestriction.betType,
          minOdds: settings.betRestriction.minOdds,
          maxOdds: settings.betRestriction?.maxOdds,
        },
        eventRestriction: {
          state: settings.eventRestriction.eventStatus === 'All' ? undefined : settings.eventRestriction.eventStatus,
          eventFilter: settings.eventRestriction.eventFilter,
        },
        periodOfValidityMs: settings.periodOfValidityMs,
      },
      status: bonus.status,
      chainId: chainsDataByEnv[environment].chain.id,
      expiresAt: +new Date(bonus.expiresAt),
      usedAt: +new Date(bonus.usedAt),
      createdAt: +new Date(bonus.createdAt),
    }
  })
}
