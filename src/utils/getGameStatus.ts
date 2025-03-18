// import { GameState } from '../docs/feed/types'


// const getIsPendingResolution = (startDate: number): boolean => {
//   const now = Date.now()
//   const isStarted = startDate < now
//   const pendingResolutionDate = startDate + 6000000

//   return isStarted && pendingResolutionDate < now
// }

// export enum GameStatus {
//   // Created,
//   // Live,
//   // Resolved,
//   // Canceled,
//   // Stopped,
//   PendingResolution,
// }

// type Test = GameStatus | GameState

// type Props = {
//   graphStatus: GameState,
//   startsAt: number
//   isGameInLive: boolean
// }

// export const getGameStatus = (props: Props): GameStatus => {
//   const { graphStatus, startsAt, isGameInLive } = props

//   const startDate = startsAt * 1000
//   const isStarted = startDate < Date.now()

//   // we use LiveGameStatus enum for conditions because it contains PrematchGameStatus
//   if (graphStatus === GameState.Canceled) {
//     return GameStatus.Canceled
//   }

//   if (graphStatus === GameState.Stopped) {
//     return GameStatus.Stopped
//   }

//   if (graphStatus === GameState.Resolved) {
//     return GameStatus.Resolved
//   }

//   if (isStarted) {
//     if (!isGameInLive && getIsPendingResolution(startDate)) {
//       return GameStatus.PendingResolution
//     }

//     return GameStatus.Live
//   }

//   return GameStatus.Created
// }
