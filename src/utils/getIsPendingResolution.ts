import { normalizeTimestampToMs } from '../helpers/normalizeTimestampToMs'
import { GameState } from '../global'


export type GetIsPendingResolutionParams = {
  state: GameState
  startsAt: string
}

/**
 * Determines if a game is pending resolution after completion.
 * Returns true if the game is in Live state but has exceeded the expected resolution window (100 minutes after start).
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/utils/getIsPendingResolution
 *
 * @example
 * import { getIsPendingResolution, GameState } from '@azuro-org/toolkit'
 *
 * const isPending = getIsPendingResolution({
 *   state: GameState.Live,
 *   startsAt: '1640000000'
 * })
 * */
export const getIsPendingResolution = ({ state, startsAt }: GetIsPendingResolutionParams): boolean => {
  if (state !== GameState.Live) {
    return false
  }

  const startDate = normalizeTimestampToMs(startsAt)

  const now = Date.now()
  const isStarted = startDate < now
  const pendingResolutionDate = startDate + 6000000

  return isStarted && pendingResolutionDate < now
}
