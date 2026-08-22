import { afterEach, describe, expect, it, vi } from 'vitest'

import { getBetsReport } from './getBetsReport'
import { BetStatus as GraphBetStatus, BetResult, type V3_Bet_Filter } from '../../docs/bets/types'
import { chainsData } from '../../config'


const CHAIN_ID = 137
const BETTOR = '0x1111111111111111111111111111111111111111'
const TOKEN = chainsData[CHAIN_ID].betToken

type FakeBet = {
  id: string
  createdBlockTimestamp: string
  status: GraphBetStatus
  result: BetResult | null
  isCashedOut: boolean
  isFreebet: boolean
  isRedeemed: boolean
  rawAmount: string
  rawPayout: string | null
  cashout: { rawPayout: string } | null
  selections: Array<{
    odds: string
    result: string | null
    outcome: { result: string | null, condition: { status: string } }
  }>
  core: { liquidityPool: { token: string, tokenDecimals: number } }
}

const createBet = (id: string, createdBlockTimestamp: string, amount: string, payout: string): FakeBet => ({
  id,
  createdBlockTimestamp,
  status: GraphBetStatus.Resolved,
  result: BetResult.Won,
  isCashedOut: false,
  isFreebet: false,
  isRedeemed: false,
  rawAmount: amount,
  rawPayout: payout,
  cashout: null,
  selections: [
    {
      odds: '1.5',
      result: 'Won',
      outcome: { result: 'Won', condition: { status: 'Resolved' } },
    },
  ],
  core: {
    liquidityPool: {
      token: TOKEN.address,
      tokenDecimals: TOKEN.decimals,
    },
  },
})

const stubSubgraph = (bets: FakeBet[]) => {
  const requestedWheres: V3_Bet_Filter[] = []
  const requestedSkips: number[] = []

  const fetchMock = vi.fn(async (_url: string, init: { body: string }) => {
    const { variables } = JSON.parse(init.body) as {
      variables: { first: number, skip?: number, where: V3_Bet_Filter }
    }

    requestedWheres.push(variables.where)
    requestedSkips.push(variables.skip ?? 0)

    const cursor = variables.where.and?.[1]?.createdBlockTimestamp_lte

    const matched = bets.filter((bet) => (
      cursor === undefined || cursor === null || BigInt(bet.createdBlockTimestamp) <= BigInt(cursor)
    ))

    const skip = variables.skip ?? 0

    return {
      ok: true,
      json: async () => ({ data: { v3Bets: matched.slice(skip, skip + variables.first) } }),
    }
  })

  vi.stubGlobal('fetch', fetchMock)

  return { fetchMock, requestedWheres, requestedSkips }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getBetsReport', () => {
  it('walks every page with an inclusive cursor and counts bets sharing a timestamp exactly once', async () => {
    const bets = [
      createBet('a', '300', '10000000', '20000000'),
      createBet('b', '200', '10000000', '0'),
      createBet('c', '200', '10000000', '0'),
      createBet('d', '100', '10000000', '25000000'),
    ]

    const { fetchMock, requestedWheres } = stubSubgraph(bets)

    const report = await getBetsReport({
      chainId: CHAIN_ID,
      filter: { bettor: BETTOR },
      pageSize: 2,
    })

    expect(report.betsCount).toBe(4)
    expect(report.isTruncated).toBe(false)
    expect(report.single!.settledCount).toBe(4)
    expect(report.single!.turnover).toBe('40')
    expect(report.single!.returns).toBe('45')
    expect(report.single!.token.symbol).toBe(TOKEN.symbol)

    // a strict cursor would have dropped one of the two bets sharing timestamp 200
    const cursors = requestedWheres.map((where) => where.and?.[1]?.createdBlockTimestamp_lte)

    expect(cursors).toEqual([ undefined, '200', '100' ])
    expect(fetchMock).toHaveBeenCalledTimes(3)

    requestedWheres.forEach((where) => {
      expect(Object.keys(where).some((key) => key.endsWith('createdBlockTimestamp_lt'))).toBe(false)
      expect(where.and?.[1] && 'createdBlockTimestamp_lt' in where.and[1]).toBeFalsy()
    })
  })

  // the two tests below look alike on purpose: each one proves that a different field of the
  // fragment is actually requested and mapped, which a unit test on `isSelectionCanceled` cannot
  it('reads a per-outcome void, where the leg is canceled but its condition stays resolved', async () => {
    const bet = createBet('a', '300', '195529', '436889')

    bet.selections = [
      { odds: '1.68', result: 'Won', outcome: { result: 'Won', condition: { status: 'Resolved' } } },
      // a voided leg where only the outcome says so
      { odds: '1.33', result: null, outcome: { result: 'Canceled', condition: { status: 'Resolved' } } },
    ]

    stubSubgraph([ bet ])

    const report = await getBetsReport({ chainId: CHAIN_ID, filter: { bettor: BETTOR } })

    // the recorded payout of 0.436889 still credits the voided leg, the surviving 1.68 does not
    expect(report.single!.returns).toBe('0.328488')
  })

  it('reads a whole-condition cancel, which predates per-outcome results', async () => {
    const bet = createBet('a', '300', '195529', '436889')

    bet.selections = [
      { odds: '1.68', result: 'Won', outcome: { result: 'Won', condition: { status: 'Resolved' } } },
      { odds: '1.33', result: null, outcome: { result: null, condition: { status: 'Canceled' } } },
    ]

    stubSubgraph([ bet ])

    const report = await getBetsReport({ chainId: CHAIN_ID, filter: { bettor: BETTOR } })

    expect(report.single!.returns).toBe('0.328488')
  })

  it('walks past a group of bets sharing a timestamp that is larger than one page', async () => {
    // an `_lte` cursor alone returns this group forever: every page is identical and nothing new
    // arrives, so without a `skip` the walk either loops or steps over the bets it never read
    const bets = [
      createBet('a', '300', '10000000', '20000000'),
      createBet('b', '200', '10000000', '0'),
      createBet('c', '200', '10000000', '0'),
      createBet('d', '200', '10000000', '0'),
      createBet('e', '100', '10000000', '25000000'),
    ]

    const { requestedSkips } = stubSubgraph(bets)

    const report = await getBetsReport({
      chainId: CHAIN_ID,
      filter: { bettor: BETTOR },
      pageSize: 2,
    })

    expect(report.betsCount).toBe(5)
    expect(report.isTruncated).toBe(false)
    expect(report.single!.settledCount).toBe(5)
    expect(report.single!.turnover).toBe('50')
    // the skip accumulates across the timestamp-200 group (1 then 1+2) so no member is re-read
    // and none is stepped over
    expect(requestedSkips).toEqual([ 0, 1, 3 ])
  })

  it('keeps the user-supplied bounds intact next to the cursor', async () => {
    const bets = [
      createBet('a', '300', '10000000', '20000000'),
      createBet('b', '200', '10000000', '0'),
      createBet('c', '100', '10000000', '0'),
    ]

    const { requestedWheres } = stubSubgraph(bets)

    await getBetsReport({
      chainId: CHAIN_ID,
      filter: { bettor: BETTOR.toUpperCase() as `0x${string}`, createdFrom: 100, createdTo: 300 },
      pageSize: 2,
    })

    expect(requestedWheres[0]).toEqual({
      actor: BETTOR,
      createdBlockTimestamp_gte: '100',
      createdBlockTimestamp_lte: '300',
    })

    expect(requestedWheres[1]!.and).toEqual([
      {
        actor: BETTOR,
        createdBlockTimestamp_gte: '100',
        createdBlockTimestamp_lte: '300',
      },
      { createdBlockTimestamp_lte: '200' },
    ])
  })

  it('flags a truncated report when maxPages is reached', async () => {
    const bets = [
      createBet('a', '300', '10000000', '20000000'),
      createBet('b', '200', '10000000', '0'),
      createBet('c', '100', '10000000', '0'),
    ]

    const { fetchMock } = stubSubgraph(bets)

    const report = await getBetsReport({
      chainId: CHAIN_ID,
      filter: { bettor: BETTOR },
      pageSize: 2,
      maxPages: 1,
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(report.isTruncated).toBe(true)
    expect(report.betsCount).toBe(2)
  })

  it('returns an empty report when the bettor has no bets', async () => {
    stubSubgraph([])

    const report = await getBetsReport({
      chainId: CHAIN_ID,
      filter: { bettor: BETTOR },
    })

    expect(report.betsCount).toBe(0)
    expect(report.byToken).toEqual([])
    expect(report.single).toBe(null)
    expect(report.isTruncated).toBe(false)
  })
})
