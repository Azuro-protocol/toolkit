import { formatUnits, type Address } from 'viem'

import { chainsData, chainsDataByEnv, type ChainId } from '../../config'
import { BonusStatus, type BonusType, type Bonus, type FreebetType, type BetRestrictionType, type EventRestrictionState } from '../../global'
import { type Environment } from '../../envs'


export type RawBonus = {
  id: string
  bonusType: BonusType
  freebetParam: {
    isBetSponsored: true
    isFeeSponsored: true
    isSponsoredBetReturnable: true
    settings: {
      bonusType: FreebetType
      feeSponsored: boolean
      betRestriction: {
        betType: BetRestrictionType | 'All'
        minOdds: string
        maxOdds?: string
      }
      eventRestriction: {
        eventStatus: EventRestrictionState | 'All'
        eventFilter?: {
          exclude: boolean
          filter: [
            {
              sportId: string
              leagues: string[]
              markets: {
                marketId: number
                gamePeriodId: number
                gameTypeId: number
              }[]
            }
          ]
        }
      }
      periodOfValidityMs: 86400000
    }
  }
  address: string
  amount: string
  status: BonusStatus
  network: string
  currency: string
  expiresAt: string
  usedAt: string
  createdAt: string
  publicCustomData: Record<string, string> | null
}

type GetBonusesResponse = {
  bonuses: RawBonus[]
}

export type GetBonusesResult = Bonus[] | null
/** @deprecated use GetBonusesResult instead */
export type GetBonuses = Bonus[] | null

export type GetBonusesParams = {
  chainId: ChainId
  account: Address
  affiliate: Address
  bonusStatus?: BonusStatus
}

/**
 * Fetches all bonuses for a bettor account filtered by status.
 * By default, retrieves only available bonuses. Returns null if no bonuses are found.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bonus/getBonuses
 *
 * @example
 * import { getBonuses, BonusStatus } from '@azuro-org/toolkit'
 *
 * const account = userWallet?.address
 * const affiliate = '0x123...'
 *
 * const bonuses = await getBonuses({
 *   chainId: 100,
 *   account,
 *   affiliate,
 *   bonusStatus: BonusStatus.Available
 * })
 * */
export const getBonuses = async (props: GetBonusesParams): Promise<GetBonusesResult> => {
  const { chainId, account, affiliate, bonusStatus = BonusStatus.Available } = props
  const { api } = chainsData[chainId]

  const response = await fetch(`${api}/bonus/get-by-addresses`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bettorAddress: account,
      poolAddress: affiliate,
      status: bonusStatus,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { bonuses }: GetBonusesResponse = await response.json()

  return bonuses.reduce<Bonus[]>((acc, bonus) => {
    const environment = `${bonus.network}${bonus.currency}` as Environment
    const { chain, betToken } = chainsDataByEnv[environment]

    // TODO: need to add environement to request params
    if (chain.id === chainId) {
      const {
        id,
        freebetParam: {
          isBetSponsored,
          isFeeSponsored,
          isSponsoredBetReturnable,
          settings,
        },
      } = bonus

      acc.push({
        id,
        amount: formatUnits(BigInt(bonus.amount), betToken.decimals),
        type: bonus.bonusType,
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
        chainId: chain.id,
        expiresAt: +new Date(bonus.expiresAt),
        usedAt: +new Date(bonus.usedAt),
        createdAt: +new Date(bonus.createdAt),
        publicCustomData: bonus.publicCustomData,
      })
    }

    return acc
  }, [])
}
