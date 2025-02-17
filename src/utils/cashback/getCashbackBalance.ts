import { type Address } from 'viem'
import { polygon } from 'viem/chains'

import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'
import { type Environment, environments } from '../../envs'


type CashbackBalanceResponse = {
  userAddress: Address
  network: Environment
  currency: string
  updatedAt: string
  amount: string
}[]

export type GetCashbackBalance = CashbackBalanceResponse[0]

type Props = {
  account: Address
  affiliate: Address
  chainId?: ChainId
}

export const getCashbackBalance = async ({ account, affiliate, chainId = polygon.id }: Props): Promise<GetCashbackBalance | null | undefined> => {
  const api = getApiEndpoint(chainId)

  const params = new URLSearchParams({
    userAddress: account,
    affiliateAddress: affiliate,
    networks: environments[chainId],
  })

  const response = await fetch(`${api}/cashback/user-balance?${params}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: CashbackBalanceResponse = await response.json()

  return data[0]
}
