import { type Address, type OneOf } from 'viem'

import { type ChainId } from '../../config'
import { type WaveId } from '../../global'
import { type WaveLevelData } from './getWaveLevels'
import { getApiEndpoint } from '../getEndpoints'
import { Environment } from '../envs'


export type WaveStatsResponse = {
  address: Address
  waveId: number
  levelActivated: boolean
  initialLevel: number
  level: number

  // points by categories
  betPoints: string
  dexPoints: string
  liqudityPoints: string
  stakingPoints: string
  leaderboardPoints: string
  manualPoints: string
  /** "2.100000", final points without level multiplier */
  points: string
  /** "2.100000", final points with level multiplier ('boost') */
  multipliedPoints: string

  sharePercent: string
  levelDescription: WaveLevelData
}


type Props = {
  account: Address
  waveId?: WaveId
} & OneOf<{
  /** @deprecated pass environment instead */
  chainId?: ChainId
} | {
  environment?: Environment
}>

export const getWaveStats = async ({ account, waveId = 'active', chainId, environment }: Props) => {
  const api = getApiEndpoint(chainId || environment || Environment.PolygonUSDT)

  const response = await fetch(`${api}/waves/${waveId}/participants/${account?.toLowerCase()}/stats`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: WaveStatsResponse = await response.json()

  return data
}
