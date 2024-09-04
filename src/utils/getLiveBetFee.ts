import { type ChainId } from '../config'
import { getApiEndpoint } from './getEndpoints'
import { environments, type Environment, isEnvironmentEnum } from './envs'


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

export const getLiveBetFee = async (env: ChainId | Environment): Promise<LiveBetFeeResponse> => {
  const api = getApiEndpoint(env)
  const environment = isEnvironmentEnum(env) ? env : environments[env]

  const response = await fetch(`${api}/orders/gas?environment=${environment}`)
  const data: LiveBetFeeResponse = await response.json()

  return data
}
