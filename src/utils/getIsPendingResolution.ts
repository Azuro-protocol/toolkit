import { GameState } from '../docs/feed/types'


type Props = {
  state: GameState
  startsAt: string
}

export const getIsPendingResolution = ({ state, startsAt }: Props): boolean => {
  if (state !== GameState.Live) {
    return false
  }

  const startDate = +startsAt * 1000
  const now = Date.now()
  const isStarted = startDate < now
  const pendingResolutionDate = startDate + 6000000

  return isStarted && pendingResolutionDate < now
}
