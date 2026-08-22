import { describe, expect, it } from 'vitest'

import { getBetsDateRange, normalizeBetsFilter, toGraphBetsWhere } from './betsFilter'
import { BetKind, BetStatusFilter } from '../../global'


const BETTOR = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
const AFFILIATE = '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'

describe('normalizeBetsFilter', () => {
  it('lowercases addresses and drops undefined keys', () => {
    const filter = normalizeBetsFilter({ bettor: BETTOR, affiliate: AFFILIATE })

    expect(filter).toEqual({
      bettor: BETTOR.toLowerCase(),
      affiliate: AFFILIATE.toLowerCase(),
    })
    expect(Object.keys(filter)).toEqual([ 'bettor', 'affiliate' ])
  })

  it('coalesces the deprecated type into status, with status winning', () => {
    expect(normalizeBetsFilter({ bettor: BETTOR, type: BetStatusFilter.Settled }).status)
      .toBe(BetStatusFilter.Settled)

    expect(normalizeBetsFilter({
      bettor: BETTOR,
      type: BetStatusFilter.Settled,
      status: BetStatusFilter.CashedOut,
    }).status).toBe(BetStatusFilter.CashedOut)
  })

  it('stays JSON-safe, since it is used as a query-key payload', () => {
    const filter = normalizeBetsFilter({
      bettor: BETTOR,
      status: BetStatusFilter.Settled,
      kind: BetKind.Combo,
      createdFrom: 1,
      createdTo: 2,
      isFreebet: false,
    })

    expect(JSON.parse(JSON.stringify(filter))).toEqual(filter)
  })
})

describe('toGraphBetsWhere', () => {
  it('maps every lifecycle preset the same way the bet list always has', () => {
    const build = (status?: BetStatusFilter) => (
      toGraphBetsWhere(normalizeBetsFilter({ bettor: BETTOR, status }))
    )

    expect(build()).toEqual({ actor: BETTOR.toLowerCase() })
    expect(build(BetStatusFilter.Unredeemed)).toEqual({
      actor: BETTOR.toLowerCase(),
      isRedeemable: true,
      isCashedOut: false,
    })
    expect(build(BetStatusFilter.Accepted)).toEqual({
      actor: BETTOR.toLowerCase(),
      status: 'Accepted',
      isCashedOut: false,
    })
    // settled = lost, or already claimed (canceled or won). A won-but-unclaimed bet is NOT settled;
    // it belongs under Unredeemed, which is what the bet list shows.
    expect(build(BetStatusFilter.Settled)).toEqual({
      or: [
        { actor: BETTOR.toLowerCase(), result: 'Lost' },
        { actor: BETTOR.toLowerCase(), isRedeemed: true, status: 'Canceled' },
        { actor: BETTOR.toLowerCase(), isRedeemed: true, result: 'Won' },
      ],
    })
    expect(build(BetStatusFilter.CashedOut)).toEqual({
      actor: BETTOR.toLowerCase(),
      isCashedOut: true,
    })
    // Pending has no subgraph representation and is intentionally not narrowed
    expect(build(BetStatusFilter.Pending)).toEqual({ actor: BETTOR.toLowerCase() })
  })

  it('repeats every shared constraint inside each settled branch', () => {
    const where = toGraphBetsWhere(normalizeBetsFilter({
      bettor: BETTOR,
      affiliate: AFFILIATE,
      status: BetStatusFilter.Settled,
      kind: BetKind.Combo,
      createdFrom: 1700000000,
      createdTo: 1800000000,
    }))

    // graph-node rejects a query mixing column filters with `or` at the same level, so `or` must be
    // the only key; and a branch missing `actor` would silently match other bettors' bets
    expect(Object.keys(where)).toEqual([ 'or' ])
    expect(where.or).toHaveLength(3)

    where.or!.forEach((branch) => {
      expect(branch).toMatchObject({
        actor: BETTOR.toLowerCase(),
        affiliate: AFFILIATE.toLowerCase(),
        type: 'Express',
        createdBlockTimestamp_gte: '1700000000',
        createdBlockTimestamp_lte: '1800000000',
      })
    })
  })

  it('refuses to build a where without a bettor, which would match every bettor', () => {
    expect(() => toGraphBetsWhere({ bettor: '' })).toThrow('bettor')
  })

  it('maps kind, date bounds and the freebet flag', () => {
    expect(toGraphBetsWhere(normalizeBetsFilter({
      bettor: BETTOR,
      affiliate: AFFILIATE,
      kind: BetKind.Combo,
      createdFrom: 1735689600,
      createdTo: 1738368000,
      isFreebet: false,
    }))).toEqual({
      actor: BETTOR.toLowerCase(),
      affiliate: AFFILIATE.toLowerCase(),
      type: 'Express',
      createdBlockTimestamp_gte: '1735689600',
      createdBlockTimestamp_lte: '1738368000',
      isFreebet: false,
    })

    expect(toGraphBetsWhere(normalizeBetsFilter({ bettor: BETTOR, kind: BetKind.Single })).type)
      .toBe('Ordinar')
  })
})

describe('getBetsDateRange', () => {
  const now = new Date(2026, 1, 17, 13, 45, 30) // 17 Feb 2026, local time

  const toDate = (seconds?: number) => new Date(seconds! * 1000)

  it('returns no bounds for "all"', () => {
    expect(getBetsDateRange('all', now)).toEqual({})
  })

  it('covers the local calendar day for "today"', () => {
    const { createdFrom, createdTo } = getBetsDateRange('today', now)

    expect(toDate(createdFrom)).toEqual(new Date(2026, 1, 17, 0, 0, 0))
    expect(toDate(createdTo)).toEqual(new Date(2026, 1, 17, 23, 59, 59))
  })

  it('counts whole calendar days, today included, for "7d" and "30d"', () => {
    expect(toDate(getBetsDateRange('7d', now).createdFrom)).toEqual(new Date(2026, 1, 11, 0, 0, 0))
    expect(toDate(getBetsDateRange('30d', now).createdFrom)).toEqual(new Date(2026, 0, 19, 0, 0, 0))
    expect(toDate(getBetsDateRange('30d', now).createdTo)).toEqual(new Date(2026, 1, 17, 23, 59, 59))
  })

  it('covers the current and the previous calendar month', () => {
    const month = getBetsDateRange('month', now)

    expect(toDate(month.createdFrom)).toEqual(new Date(2026, 1, 1, 0, 0, 0))
    expect(toDate(month.createdTo)).toEqual(new Date(2026, 1, 17, 23, 59, 59))

    const prevMonth = getBetsDateRange('prevMonth', now)

    expect(toDate(prevMonth.createdFrom)).toEqual(new Date(2026, 0, 1, 0, 0, 0))
    expect(toDate(prevMonth.createdTo)).toEqual(new Date(2026, 0, 31, 23, 59, 59))
  })

  it('crosses a year boundary for "prevMonth" in January', () => {
    const { createdFrom, createdTo } = getBetsDateRange('prevMonth', new Date(2026, 0, 5))

    expect(toDate(createdFrom)).toEqual(new Date(2025, 11, 1, 0, 0, 0))
    expect(toDate(createdTo)).toEqual(new Date(2025, 11, 31, 23, 59, 59))
  })
})
