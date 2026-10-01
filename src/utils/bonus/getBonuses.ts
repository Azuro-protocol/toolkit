import { type Address } from 'viem'

import { chainsData, type ChainId } from '../../config'
import { BonusStatus, type Bonus } from '../../global'
import { formatBonus, getBonusChainData } from './formatBonus'
import { type RawBonus } from './types'


export type { RawBonus } from './types'

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
    const { chain } = getBonusChainData(bonus)

    // TODO: need to add environement to request params
    if (chain.id === chainId) {
      acc.push(formatBonus(bonus))
    }

    return acc
  }, [])
}
