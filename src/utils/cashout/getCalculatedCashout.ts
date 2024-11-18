import { type Address } from 'viem'

import { type Environment } from '../../envs'
import { type ChainId, chainsData } from '../../config'


type GetCalculatedCashoutResponse = {
  calculationId: string, // environment_account_betId
  owner: string,
  environment: Environment,
  betId: string,
  cashoutAmount: string,
  cashoutOdds: string,
  expiredAt: number,
  isLive: boolean
}

export type GetCalculatedCashout = {
  id: string, // environment_account_betId
  account: string,
  environment: Environment,
  betId: string,
  cashoutAmount: string,
  multiplier: string,
  expiredAt: number,
  isLive: boolean
} | null

type Props = {
  chainId: ChainId
  account: Address
  betId: string
  isLive: boolean
}

export const getCalculatedCashout = async (props: Props): Promise<GetCalculatedCashout> => {
  const { chainId, account, betId, isLive } = props
  const { api, environment } = chainsData[chainId]

  const response = await fetch(`${api}/cashout/get-calculation`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      environment,
      owner: account,
      betId,
      isLive,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const { calculationId, cashoutOdds, owner, ...rest }: GetCalculatedCashoutResponse = await response.json()

  return {
    id: calculationId,
    multiplier: cashoutOdds,
    account: owner,
    ...rest,
  }
}
