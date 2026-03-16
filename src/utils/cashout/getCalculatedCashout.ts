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

export type GetCalculatedCashoutResult = {
  calculationId: string // environment_account_betId
  account: string
  environment: Environment
  tokenId: string
  cashoutAmount: string
  cashoutOdds: string
  expiredAt: number
  approveExpiredAt: number
  isLive: boolean
} | null

/** @deprecated use GetCalculatedCashoutResult instead */
export type GetCalculatedCashout = GetCalculatedCashoutResult

export type GetCalculatedCashoutParams = {
  chainId: ChainId
  account: Address
  graphBetId: string
}


/**
 * Retrieves the calculated cashout information for a specific bet, including the cashout amount and odds.
 * Returns null if no cashout calculation is available for the bet.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/utils/cashout/getCalculatedCashout
 *
 * @example
 * import { getCalculatedCashout } from '@azuro-org/toolkit'
 *
 * const chainId = 100
 * const account = '0x123...'
 * const graphBetId = '456'
 *
 * const cashout = await getCalculatedCashout({
 *   chainId,
 *   account,
 *   graphBetId,
 * })
 *
 * if (cashout) {
 *   console.log(`Cashout amount: ${cashout.cashoutAmount}`)
 *   console.log(`Cashout odds: ${cashout.cashoutOdds}`)
 * }
 * */
export const getCalculatedCashout = async (props: GetCalculatedCashoutParams): Promise<GetCalculatedCashoutResult> => {
  const { chainId, account, graphBetId } = props
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
      betId: graphBetId,
    }),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const {
    owner, betId, ...rest
  }: GetCalculatedCashoutResponse = await response.json()

  return {
    account: owner,
    tokenId: betId,
    ...rest,
  }
}
