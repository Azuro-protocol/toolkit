import { formatUnits, type Address } from 'viem'

import { chainsData, chainsDataByEnv, type ChainId } from '../../config'
import { BonusType, type Freebet, type Selection } from '../../global'
import { type Environment } from '../../envs'
import { type RawBonus } from './getBonuses'


export type GetFreebetsResponse = {
  bonuses: RawBonus[]
}

export type GetAvailableFreebetsParams = {
  chainId: ChainId
  account: Address
  affiliate: Address
  selections: Selection[]
}

export type GetAvailableFreebetsResult = Freebet[] | null
/** @deprecated use GetAvailableFreebetsResult instead */
export type GetAvailableFreebets = Freebet[] | null

/**
 * Retrieves available freebets for a bettor that can be applied to specific bet selections.
 * Returns null if no freebets are available for the given selections.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bonus/getAvailableFreebets
 *
 * @example
 * import { getAvailableFreebets } from '@azuro-org/toolkit'
 *
 * const account = userWallet?.address
 * const affiliate = affiliateAddress
 * const selections = [
 *   { conditionId: '1', outcomeId: '1' },
 * ]
 *
 * const freebets = await getAvailableFreebets({
 *   chainId: 100,
 *   account,
 *   affiliate,
 *   selections
 * })
 * */
export const getAvailableFreebets = async ({ chainId, account, affiliate, selections }: GetAvailableFreebetsParams): Promise<GetAvailableFreebetsResult> => {
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
      expiresAt: Date.parse(bonus.expiresAt),
      usedAt: Date.parse(bonus.usedAt),
      createdAt: Date.parse(bonus.createdAt),
      publicCustomData: bonus.publicCustomData,
    }
  })
}
