import { type Address } from 'viem'

import { type Environment } from '../../envs'
import { type ChainId, chainsData } from '../../config'


type GetCalculatedCashoutResponse = {
  calculationId: string // environment_account_betId
  owner: string
  environment: Environment
  betId: string
  cashoutAmount: string
  cashoutOdds: string
  expiredAt: number
  approveExpiredAt: number
  isLive: boolean
}

export type GetCalculatedCashout = {
  calculationId: string // environment_account_betId
  account: string
  environment: Environment
  tokenId: string
  cashoutAmount: string
  multiplier: string
  expiredAt: number
  approveExpiredAt: number
  isLive: boolean
} | null

type Props = {
  chainId: ChainId
  account: Address
  tokenId: string
  isLive: boolean
}

export const getCalculatedCashout = async (props: Props): Promise<GetCalculatedCashout> => {
  const { chainId, account, tokenId, isLive } = props
  const { api, environment, contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const response = await fetch(`${api}/cashout/get-calculation`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      environment,
      owner: account,
      betId: tokenId,
      isLive,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const {
    cashoutOdds, owner, betId, ...rest
  }: GetCalculatedCashoutResponse = await response.json()

  return {
    multiplier: cashoutOdds,
    account: owner,
    tokenId: betId,
    ...rest,
  }
}
