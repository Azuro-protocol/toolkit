import { type Address } from 'viem'
import { polygon } from 'viem/chains'

import { type ChainId } from '../../config'
import { type WaveId } from '../../global'
import { getApiEndpoint } from '../getEndpoints'


type Props = {
  account: Address
  waveId?: WaveId
  chainId?: ChainId
}

export const activateWave = async ({ account, waveId = 'active', chainId = polygon.id }: Props) => {
  const api = getApiEndpoint(chainId)
  const response = await fetch(`${api}/waves/${waveId}/participants/${account?.toLowerCase()}/activate`)
  await response.json()
}
