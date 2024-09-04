import type { OneOf } from 'viem'

import { type ChainId } from '../../config'
import { type WaveId } from '../../global'
import { getApiEndpoint } from '../getEndpoints'
import { Environment } from '../envs'


export enum WaveLevelName {
  Grey = 'Grey',
  Mist = 'Mist',
  Sky = 'Sky',
  Blue = 'Blue',
  Ultramarine = 'Ultramarine',
  Bright = 'Bright',
  Brilliant = 'Brilliant',
  Royal = 'Royal',
}

export type WaveLevelData = {
  level: number
  name: WaveLevelName
  boost: string
  pointsNeeded: string
  comment: string
}

export type WaveLevelsResponse = WaveLevelData[]

type Props = {
  waveId?: WaveId
} & OneOf<{
  /** @deprecated pass environment instead */
  chainId?: ChainId
} | {
  environment?: Environment
}>

export const getWaveLevels = async ({ waveId, chainId, environment }: Props = { waveId: 'active' }) => {
  const api = getApiEndpoint(chainId || environment || Environment.PolygonUSDT)
  const response = await fetch(`${api}/waves/${waveId}/levels`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: WaveLevelsResponse = await response.json()

  return [ ...data ].sort((a, b) => a.level - b.level)
}
