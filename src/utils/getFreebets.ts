import { type Hex, type Address } from 'viem'

import { type ChainId } from '../config'
import { getApiEndpoint } from './getEndpoints'


export enum RestFreeBetStatus {
  New = 'New',
  Claimed = 'Claimed',
  Redeemed = 'Redeemed',
  Canceled = 'Canceled',
  Reissued = 'Reissued',
  Withdrawn = 'Withdrawn',
}

export type FreeBet = {
  id: number
  owner: Address
  amount: string // raw '10000000'
  minOdds: string // raw '10000000'
  contractId: number
  signature: Hex
  expiresAt: number // unix timestamp in seconds
  campaign: string
  status: RestFreeBetStatus
  contract: {
    id: number
    affiliate: Address
    chainId: string
    freebetContractAddress: Address
    decimals: number
  }
}

type Props = {
  chainId: ChainId
  account: Address
  affiliate: Address
}

export const getFreeBets = async ({ chainId, account, affiliate }: Props) => {
  const api = getApiEndpoint(chainId!)

  const params = new URLSearchParams({
    owner: account.toLowerCase(),
    affiliate: affiliate,
  })
  const response = await fetch(`${api}/freebets/list?${params}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: FreeBet[] = await response.json()

  return data
}
