import { environments } from '../envs'
import { type ChainId } from '../config'
import { getApiEndpoint } from './getEndpoints'


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

export const getBetFee = async (chainId: ChainId): Promise<BetFeeResponse> => {
  const api = getApiEndpoint(chainId)
  const environment = environments[chainId]

  const response = await fetch(`${api}/bet/gas-info?environment=${environment}`)
  const data: BetFeeResponse = await response.json()

  return data
}
