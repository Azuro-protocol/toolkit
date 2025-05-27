import { type Address } from 'viem'

import { chainsData, chainsDataByEnv, type ChainId } from '../../config'
import { type BonusType, type Bonus, type BonusStatus } from '../../global'
import { type Environment } from '../../envs'


export type RawBonus = {
  id: string
  bonusType: BonusType
  freebetParam: {
    isBetSponsored: true,
    isFeeSponsored: true,
    isSponsoredBetReturnable: true
  },
  address: string
  amount: string
  status: BonusStatus
  network: string
  currency: string
  expiresAt: string
  usedAt: string
  createdAt: string
}

type GetBonusesResponse = {
  bonuses: RawBonus[]
}

export type GetBonuses = Bonus[] | null

type Props = {
  chainId: ChainId
  account: Address
  affiliate: Address
}

export const getBonuses = async ({ chainId, account, affiliate }: Props): Promise<GetBonuses> => {
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
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { bonuses }: GetBonusesResponse = await response.json()

  return bonuses.map(bonus => {
    const environment = `${bonus.network}${bonus.currency}` as Environment

    return {
      id: bonus.id,
      amount: bonus.amount,
      type: bonus.bonusType,
      params: bonus.freebetParam,
      status: bonus.status,
      chainId: chainsDataByEnv[environment].chain.id,
      expiresAt: +new Date(bonus.expiresAt),
      usedAt: +new Date(bonus.usedAt),
      createdAt: +new Date(bonus.createdAt),
    }
  })
}
