import { BetStatus as GraphBetStatus } from '../../docs/bets/types'
import { BetOrderState, GameState } from '../../global'
import { getIsPendingResolution } from '../../utils/getIsPendingResolution'


export enum BetStatus {
  Accepted,
  Live,
  PendingResolution,
  Resolved,
  Canceled,
  Preparing,
  Rejected,
}

type Game = {
  state: GameState
  startsAt: string
}

const filterLastGames = (games: Game[]) => {
  if (!games?.length) {
    return []
  }

  const lastStartDate = Math.max(...games.map(({ startsAt }) => +startsAt))

  return games.filter(({ startsAt }) => +startsAt === lastStartDate)
}

type Props = {
  games: Game[]
  orderState: BetOrderState | null
  graphStatus: GraphBetStatus | null
}

/**
 * Determines the current status of a bet based on order state, on-chain status, and game states.
 * Returns a unified bet status that combines API order state and blockchain data.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/getBetStatus
 *
 * @example
 * import { getBetStatus, BetStatus } from '@azuro-org/toolkit'
 *
 * const games = [
 *   { state: GameState.Live, startsAt: '1234567890' },
 * ]
 * const orderState = BetOrderState.Sent
 * const graphStatus = GraphBetStatus.Accepted
 *
 * const status = getBetStatus({ games, orderState, graphStatus })
 *
 * if (status === BetStatus.Live) {
 *   console.log('Bet is live!')
 * }
 * */
export const getBetStatus = (props: Props): BetStatus => {
  const { games, graphStatus, orderState } = props

  if (
    (!orderState && !graphStatus)
    || orderState === BetOrderState.Created
    || orderState === BetOrderState.Placed
    || (orderState === BetOrderState.Sent && !graphStatus)
  ) {
    return BetStatus.Preparing
  }

  if (orderState === BetOrderState.Rejected) {
    return BetStatus.Rejected
  }

  if (
    graphStatus === GraphBetStatus.Canceled
    || orderState === BetOrderState.Canceled
  ) {
    return BetStatus.Canceled
  }

  if (graphStatus === GraphBetStatus.Resolved) {
    return BetStatus.Resolved
  }

  const lastGames = filterLastGames(games)

  if (
    lastGames.every((game) => game.state === GameState.Finished)
    || lastGames.some((game) => getIsPendingResolution(game))
  ) {
    return BetStatus.PendingResolution
  }

  const isLive = games?.some(game => game.state === GameState.Live)

  if (isLive) {
    return BetStatus.Live
  }

  return BetStatus.Accepted
}
