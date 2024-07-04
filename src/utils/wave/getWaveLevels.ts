import { polygon } from 'viem/chains'

import { type ChainId } from '../../config'
import { type WaveId } from '../../global'
import { getApiEndpoint } from '../getEndpoints'


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
  chainId?: ChainId
}

export const getWaveLevels = async ({ waveId, chainId }: Props = { waveId: 'active', chainId: polygon.id }) => {
  const api = getApiEndpoint(chainId!)
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
