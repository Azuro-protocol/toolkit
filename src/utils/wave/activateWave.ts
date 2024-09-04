import { type Address, type OneOf } from 'viem'

import { type ChainId } from '../../config'
import { type WaveId } from '../../global'
import { getApiEndpoint } from '../getEndpoints'
import { Environment } from '../envs'


type Props = {
  account: Address
  waveId?: WaveId
} & OneOf<{
  /** @deprecated pass environment instead */
  chainId?: ChainId
} | {
  environment?: Environment
}>

export const activateWave = async ({ account, waveId = 'active', chainId, environment }: Props) => {
  const api = getApiEndpoint(chainId || environment || Environment.PolygonUSDT)
  const response = await fetch(`${api}/waves/${waveId}/participants/${account?.toLowerCase()}/activate`)
  await response.json()
}
