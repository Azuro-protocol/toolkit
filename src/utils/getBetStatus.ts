import { GameState } from '../docs/feed/types'
import { BetStatus as GraphBetStatus } from '../docs/bets/types'
import { getIsPendingResolution } from './getIsPendingResolution'


export enum BetStatus {
  Accepted,
  Live,
  PendingResolution,
  Resolved,
  Canceled,
}

type Game = {
  state: GameState
  startsAt: string
}

const getExpressIsPendingResolution = (games: Game[]) => {
  const lastStartDate = Math.max(...games.map(({ startsAt }) => +startsAt))
  const lastGames = games.filter(({ startsAt }) => +startsAt === lastStartDate)

  return lastGames.some((game) => {
    return getIsPendingResolution(game)
  })
}

type Props = {
  games: Game[]
  graphStatus: GraphBetStatus
}

export const getBetStatus = (props: Props): BetStatus => {

  const { games, graphStatus } = props

  if (graphStatus === GraphBetStatus.Canceled) {
    return BetStatus.Canceled
  }

  if (graphStatus === GraphBetStatus.Resolved) {
    return BetStatus.Resolved
  }

  const isExpress = games.length > 1

  const isPendingResolution = isExpress
    ? getExpressIsPendingResolution(games)
    : getIsPendingResolution(games[0]!)

  if (isPendingResolution) {
    return BetStatus.PendingResolution
  }

  const isLive = games.some(game => game.state === GameState.Live)

  if (isLive) {
    return BetStatus.Live
  }

  return BetStatus.Accepted
}
