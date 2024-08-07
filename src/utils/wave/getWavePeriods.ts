import { polygon } from 'viem/chains'

import { type ChainId } from '../../config'
import { type WaveId } from '../../global'
import { getApiEndpoint } from '../getEndpoints'


type Period = {
  id: number
  /** ISO String "2024-05-13T00:00:00.000Z" */
  startsAt: string
  /** ISO String "2024-05-20T00:00:00.000Z". It's a startsAt of next period */
  endsAt: string
  totalPoints: string
  waveId: number
}

export type WavePeriodsResponse = Period[]

type Props = {
  waveId?: WaveId
  chainId?: ChainId
}

export const getWavePeriods = async ({ waveId, chainId }: Props = { waveId: 'active', chainId: polygon.id }) => {
  const api = getApiEndpoint(chainId!)

  const response = await fetch(`${api}/waves/${waveId}/periods`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: WavePeriodsResponse = await response.json()

  return data
}
