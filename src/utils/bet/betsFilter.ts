import { type Address } from 'viem'

import {
  BetResult,
  BetStatus as GraphBetStatus,
  BetType as GraphBetType,
  type V3_Bet_Filter as Bet_Filter,
} from '../../docs/bets/types'
import { BetKind, BetStatusFilter } from '../../global'


export type BetsFilter = {
  bettor: Address
  affiliate?: Address
  /** lifecycle preset; narrows both the bet list and the report */
  status?: BetStatusFilter
  /** single (Ordinar) vs combo (Express) */
  kind?: BetKind
  /** inclusive lower bound, unix SECONDS (matches `Bet.createdAt`) */
  createdFrom?: number
  /** inclusive upper bound, unix SECONDS */
  createdTo?: number
  /** `true` = freebet-funded only, `false` = own-funds only, omit = both */
  isFreebet?: boolean
  /**
   * @deprecated renamed to `status`. When both are set, `status` wins.
   * */
  type?: BetStatusFilter
}

/**
 * Addresses lowercased, `type` -> `status` coalesced, `undefined` keys dropped.
 * Stable and JSON-safe: this object is used as a query-key payload.
 * */
export type NormalizedBetsFilter = {
  bettor: string
  affiliate?: string
  status?: BetStatusFilter
  kind?: BetKind
  createdFrom?: number
  createdTo?: number
  isFreebet?: boolean
}

/**
 * Brings a user-supplied filter to a canonical form: addresses lowercased, the deprecated `type`
 * coalesced into `status`, and every `undefined` key dropped so that two equivalent filters
 * produce the same object (and therefore the same query key).
 *
 * @example
 * import { normalizeBetsFilter } from '@azuro-org/toolkit'
 *
 * normalizeBetsFilter({ bettor: '0xAbC...', status: BetStatusFilter.Settled })
 * // { bettor: '0xabc...', status: 'settled' }
 * */
export const normalizeBetsFilter = (filter: BetsFilter): NormalizedBetsFilter => {
  const { bettor, affiliate, status, type, kind, createdFrom, createdTo, isFreebet } = filter

  // stays total on purpose: this runs on every render to build a query key, so a missing bettor
  // must not throw here. `toGraphBetsWhere` rejects it at the request boundary instead.
  const normalizedFilter: NormalizedBetsFilter = {
    bettor: bettor?.toLowerCase(),
  }

  if (affiliate) {
    normalizedFilter.affiliate = affiliate.toLowerCase()
  }

  const resolvedStatus = status ?? type

  if (resolvedStatus !== undefined) {
    normalizedFilter.status = resolvedStatus
  }

  if (kind !== undefined) {
    normalizedFilter.kind = kind
  }

  if (createdFrom !== undefined) {
    normalizedFilter.createdFrom = createdFrom
  }

  if (createdTo !== undefined) {
    normalizedFilter.createdTo = createdTo
  }

  if (isFreebet !== undefined) {
    normalizedFilter.isFreebet = isFreebet
  }

  return normalizedFilter
}

/**
 * The column constraints for every lifecycle preset except `Settled`, which cannot be expressed as
 * flat columns — see `toSettledBetsWhere`. Shared by the v3 and legacy bet queries so the two cannot
 * drift apart on what a preset means.
 *
 * `BetStatusFilter.Pending` has no subgraph representation and is intentionally not narrowed.
 * */
export const toBetStatusWhere = (status?: BetStatusFilter): Bet_Filter => {
  if (status === BetStatusFilter.Unredeemed) {
    return { isRedeemable: true, isCashedOut: false }
  }

  if (status === BetStatusFilter.Accepted) {
    return { status: GraphBetStatus.Accepted, isCashedOut: false }
  }

  if (status === BetStatusFilter.CashedOut) {
    return { isCashedOut: true }
  }

  return {}
}

/**
 * Wraps a bet filter so it matches only *settled* bets: ones that lost, or whose win or cancellation
 * refund the bettor has already claimed. A won-but-unclaimed bet is deliberately **not** settled — it
 * belongs under `Unredeemed` — which is what bet-history UIs show, and what keeps a bet list and any
 * aggregate computed from the same filter describing the same set of bets.
 *
 * The shared constraints are repeated inside every branch on purpose. This cannot be flattened:
 * graph-node rejects a query that mixes column filters with `or` at the same level, requiring
 * `{ or: [ { actor, ... }, { actor, ... } ] }` rather than `{ actor, or: [ ... ] }`.
 *
 * @example
 * toSettledBetsWhere({ actor: '0xabc...' })
 * // { or: [
 * //   { actor: '0xabc...', result: 'Lost' },
 * //   { actor: '0xabc...', isRedeemed: true, status: 'Canceled' },
 * //   { actor: '0xabc...', isRedeemed: true, result: 'Won' },
 * // ] }
 * */
export const toSettledBetsWhere = <TFilter extends object>(base: TFilter): { or: TFilter[] } => ({
  or: [
    { ...base, result: BetResult.Lost },
    { ...base, isRedeemed: true, status: GraphBetStatus.Canceled },
    { ...base, isRedeemed: true, result: BetResult.Won },
  ],
})

/**
 * The only place a bets filter becomes a subgraph `where`. The bet list and the bets report both
 * call it, which is what guarantees that a report always describes exactly the bets in the list.
 *
 * `BetStatusFilter.Pending` has no subgraph representation and is intentionally not handled.
 *
 * @example
 * import { normalizeBetsFilter, toGraphBetsWhere } from '@azuro-org/toolkit'
 *
 * const where = toGraphBetsWhere(normalizeBetsFilter({ bettor, status: BetStatusFilter.Settled }))
 * */
export const toGraphBetsWhere = (filter: NormalizedBetsFilter): Bet_Filter => {
  const { bettor, affiliate, status, kind, createdFrom, createdTo, isFreebet } = filter

  // an empty bettor would be dropped from the serialized variables and the query would then match
  // every bettor's bets, so fail loudly instead of silently reporting on the whole protocol
  if (!bettor) {
    throw new Error('toGraphBetsWhere: "bettor" is required')
  }

  const where: Bet_Filter = {
    actor: bettor,
    ...toBetStatusWhere(status),
  }

  if (affiliate) {
    where.affiliate = affiliate
  }

  if (kind !== undefined) {
    where.type = kind === BetKind.Combo ? GraphBetType.Express : GraphBetType.Ordinar
  }

  if (createdFrom !== undefined) {
    where.createdBlockTimestamp_gte = String(createdFrom)
  }

  if (createdTo !== undefined) {
    where.createdBlockTimestamp_lte = String(createdTo)
  }

  if (isFreebet !== undefined) {
    where.isFreebet = isFreebet
  }

  // must run last: it distributes every constraint collected above across its branches
  if (status === BetStatusFilter.Settled) {
    return toSettledBetsWhere(where)
  }

  return where
}

/** In display order, so a UI can render the options without restating them. */
export const betsDateRangePresets = [ 'all', 'today', '7d', '30d', 'month', 'prevMonth' ] as const

export type BetsDateRangePreset = typeof betsDateRangePresets[number]

const getStartOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const toUnixSeconds = (date: Date): number => Math.floor(date.getTime() / 1000)

/** the very last second of the day `date` belongs to */
const getEndOfDaySeconds = (date: Date): number => {
  const startOfNextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

  return toUnixSeconds(startOfNextDay) - 1
}

/**
 * Turns a date-range preset into inclusive unix-seconds bounds, using the **local** timezone, so
 * that "Today" means the bettor's today. Day-based presets count whole calendar days including
 * today: `7d` covers today plus the 6 preceding days.
 *
 * @example
 * import { getBetsDateRange } from '@azuro-org/toolkit'
 *
 * const { createdFrom, createdTo } = getBetsDateRange('30d')
 * */
export const getBetsDateRange = (
  preset: BetsDateRangePreset,
  now: Date = new Date()
): { createdFrom?: number, createdTo?: number } => {
  if (preset === 'all') {
    return {}
  }

  const startOfToday = getStartOfDay(now)
  const endOfToday = getEndOfDaySeconds(now)

  if (preset === 'today') {
    return {
      createdFrom: toUnixSeconds(startOfToday),
      createdTo: endOfToday,
    }
  }

  if (preset === '7d' || preset === '30d') {
    const days = preset === '7d' ? 7 : 30
    const start = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), startOfToday.getDate() - days + 1)

    return {
      createdFrom: toUnixSeconds(start),
      createdTo: endOfToday,
    }
  }

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  if (preset === 'month') {
    return {
      createdFrom: toUnixSeconds(startOfMonth),
      createdTo: endOfToday,
    }
  }

  if (preset === 'prevMonth') {
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    return {
      createdFrom: toUnixSeconds(startOfPrevMonth),
      createdTo: toUnixSeconds(startOfMonth) - 1,
    }
  }

  // an unrecognised preset must not silently inherit the previous branch's bounds
  return {}
}
