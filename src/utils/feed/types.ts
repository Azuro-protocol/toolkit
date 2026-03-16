import type { GameState, ISOTimestamp } from '../../global'


export enum GameOrderBy {
  StartsAt = 'startsAt',
  Turnover = 'turnover'
}

export type GameParticipant = {
  image: string | null | undefined
  name: string
}

export type SportHubSlug = 'sports' | 'esports'

export type GameData = {
  id: string
  gameId: string
  slug: string
  title: string
  /** to align with the legacy from the subgraph, it's the unix timestamp in seconds, e.g. `"1771707600"` */
  startsAt: string
  state: GameState
  turnover: string
  sport: {
    sportId: string
    slug: string
    name: string
    sporthub: {
      id: string
      slug: SportHubSlug
    }
  }
  league: {
    id?: string
    slug: string
    name: string
  }
  country: {
    id?: string
    slug: string
    name: string
  }
  participants: GameParticipant[]
}

export type PaginatedGamesResponse = {
  games: GameData[]
  page: number
  perPage: number
  total: number
  totalPages: number
}
