import { environments } from '../../envs'
import { type ChainId } from '../../config'
import { getApiEndpoint } from '../getEndpoints'


export type BetFeeResponse = {
  gasLimit: number
  gasPrice: number
  betTokenRate: number
  gasPriceInBetToken: number
  slippage: number
  gasAmount: number
  relayerFeeAmount: string
  beautyRelayerFeeAmount: string
  symbol: string
  decimals: number
}

export type GetBetFeeParams = ChainId

export type GetBetFeeResult = BetFeeResponse

/**
 * Retrieves the current relayer fee information for placing bets on a specific chain.
 * Returns gas price, bet token rate, and calculated relayer fee amount.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/getBetFee
 *
 * @example
 * import { getBetFee } from '@azuro-org/toolkit'
 *
 * const chainId = 137
 *
 * const feeInfo = await getBetFee(chainId)
 *
 * console.log('Relayer fee:', feeInfo.beautyRelayerFeeAmount, feeInfo.symbol)
 * console.log('Gas limit:', feeInfo.gasLimit)
 * */
export const getBetFee = async (chainId: ChainId): Promise<GetBetFeeResult> => {
  const api = getApiEndpoint(chainId)
  const environment = environments[chainId]

  const response = await fetch(`${api}/bet/gas-info?environment=${environment}`)

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: BetFeeResponse = await response.json()

  return data
}
