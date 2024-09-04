import { environments } from '../envs'
import { type ChainId } from '../config'
import { getApiEndpoint } from './getEndpoints'


export type LiveBetFeeResponse = {
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

export const getLiveBetFee = async (chainId: ChainId): Promise<LiveBetFeeResponse> => {
  const api = getApiEndpoint(chainId)
  const environment = environments[chainId]

  const response = await fetch(`${api}/orders/gas?environment=${environment}`)
  const data: LiveBetFeeResponse = await response.json()

  return data
}
