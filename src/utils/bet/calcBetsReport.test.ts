import { parseUnits, type Address } from 'viem'
import { describe, expect, it } from 'vitest'

import { calcBetsReport, type BetsReportEntry, type BetsReportToken } from './calcBetsReport'
import { BetResult, BetStatus as GraphBetStatus } from '../../docs/bets/types'


const USDT: BetsReportToken = {
  address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' as Address,
  decimals: 6,
  symbol: 'USDT',
}

const WETH: BetsReportToken = {
  address: '0x4200000000000000000000000000000000000006' as Address,
  decimals: 18,
  symbol: 'WETH',
}

let entryIndex = 0

const raw = (value: string, token: BetsReportToken = USDT): string => (
  parseUnits(value, token.decimals).toString()
)

const createEntry = (props: Partial<BetsReportEntry> = {}): BetsReportEntry => ({
  id: `bet-${++entryIndex}`,
  status: GraphBetStatus.Resolved,
  result: BetResult.Won,
  isCashedOut: false,
  isFreebet: false,
  rawAmount: raw('100'),
  rawPayout: raw('126.86058'),
  rawCashoutPayout: null,
  token: USDT,
  ...props,
})

describe('calcBetsReport', () => {
  it('reads the cashout payout, not the notional payout, for a cashed out bet that resolved as won', () => {
    const { single } = calcBetsReport([
      createEntry({
        isCashedOut: true,
        status: GraphBetStatus.Resolved,
        result: BetResult.Won,
        rawAmount: raw('116'),
        rawPayout: raw('240.12'),
        rawCashoutPayout: raw('114.84'),
      }),
    ])

    expect(single!.turnover).toBe('116')
    expect(single!.returns).toBe('114.84')
    expect(single!.profit).toBe('-1.16')
    expect(single!.roi).toBe(-1)
  })

  it('reads the cashout payout, not the refund, for a cashed out bet that was later canceled', () => {
    const { single } = calcBetsReport([
      createEntry({
        isCashedOut: true,
        status: GraphBetStatus.Canceled,
        result: null,
        rawAmount: raw('1'),
        rawPayout: raw('1'),
        rawCashoutPayout: raw('0.99'),
      }),
    ])

    expect(single!.returns).toBe('0.99')
    expect(single!.profit).toBe('-0.01')
  })

  it('treats a canceled bet as a refund of the stake', () => {
    const { single } = calcBetsReport([
      createEntry({
        status: GraphBetStatus.Canceled,
        result: null,
        rawAmount: raw('41.3'),
        rawPayout: raw('41.3'),
      }),
    ])

    expect(single!.turnover).toBe('41.3')
    expect(single!.returns).toBe('41.3')
    expect(single!.profit).toBe('0')
    expect(single!.roi).toBe(0)
    expect(single!.settledCount).toBe(1)
  })

  it('counts a lost bet as a zero return', () => {
    const { single } = calcBetsReport([
      createEntry({
        result: BetResult.Lost,
        rawAmount: raw('20'),
        rawPayout: raw('0'),
      }),
    ])

    expect(single!.turnover).toBe('20')
    expect(single!.returns).toBe('0')
    expect(single!.profit).toBe('-20')
    expect(single!.roi).toBe(-100)
  })

  it('excludes a pending bet from ROI and reports it as atStake', () => {
    const { single, betsCount } = calcBetsReport([
      createEntry({
        status: GraphBetStatus.Accepted,
        result: null,
        rawAmount: raw('23.61'),
        rawPayout: null,
      }),
    ])

    expect(betsCount).toBe(1)
    expect(single!.betsCount).toBe(1)
    expect(single!.pendingCount).toBe(1)
    expect(single!.settledCount).toBe(0)
    expect(single!.atStake).toBe('23.61')
    expect(single!.turnover).toBe('0')
    expect(single!.returns).toBe('0')
    expect(single!.roi).toBe(null)
  })

  it('mixes settled and pending bets without letting the pending one touch ROI', () => {
    const { single } = calcBetsReport([
      createEntry({ result: BetResult.Won, rawAmount: raw('100'), rawPayout: raw('150') }),
      createEntry({ result: BetResult.Lost, rawAmount: raw('100'), rawPayout: raw('0') }),
      createEntry({ status: GraphBetStatus.Accepted, result: null, rawAmount: raw('50'), rawPayout: null }),
    ])

    expect(single!.betsCount).toBe(3)
    expect(single!.settledCount).toBe(2)
    expect(single!.pendingCount).toBe(1)
    expect(single!.turnover).toBe('200')
    expect(single!.returns).toBe('150')
    expect(single!.profit).toBe('-50')
    expect(single!.roi).toBe(-25)
    expect(single!.atStake).toBe('50')
  })

  it('keeps freebet bets out of turnover and returns and reports them on their own line', () => {
    const { single } = calcBetsReport([
      createEntry({ result: BetResult.Won, rawAmount: raw('100'), rawPayout: raw('150') }),
      createEntry({
        isFreebet: true,
        result: BetResult.Won,
        rawAmount: raw('30'),
        rawPayout: raw('49.599'),
      }),
      createEntry({
        isFreebet: true,
        status: GraphBetStatus.Accepted,
        result: null,
        rawAmount: raw('10'),
        rawPayout: null,
      }),
    ])

    expect(single!.betsCount).toBe(1)
    expect(single!.turnover).toBe('100')
    expect(single!.returns).toBe('150')
    expect(single!.roi).toBe(50)
    expect(single!.atStake).toBe('0')

    expect(single!.freebet.count).toBe(2)
    expect(single!.freebet.turnover).toBe('30')
    expect(single!.freebet.returns).toBe('49.599')
    expect(single!.freebet.profit).toBe('19.599')
    expect(single!.freebet.atStake).toBe('10')
  })

  it('returns roi null instead of NaN or Infinity when turnover is zero', () => {
    const empty = calcBetsReport([])

    expect(empty.byToken).toEqual([])
    expect(empty.single).toBe(null)
    expect(empty.betsCount).toBe(0)

    const freebetOnly = calcBetsReport([
      createEntry({ isFreebet: true, result: BetResult.Won, rawAmount: raw('30'), rawPayout: raw('49.599') }),
    ])

    expect(freebetOnly.single!.turnover).toBe('0')
    expect(freebetOnly.single!.roi).toBe(null)
    expect(Number.isNaN(freebetOnly.single!.roi)).toBe(false)
  })

  it('splits by token, sorts by turnover desc and exposes single only for one token', () => {
    const oneToken = calcBetsReport([
      createEntry({ result: BetResult.Won, rawAmount: raw('10'), rawPayout: raw('15') }),
    ])

    expect(oneToken.byToken).toHaveLength(1)
    expect(oneToken.single).toBe(oneToken.byToken[0])

    const twoTokens = calcBetsReport([
      createEntry({
        token: WETH,
        result: BetResult.Won,
        rawAmount: raw('1', WETH),
        rawPayout: raw('2.5', WETH),
      }),
      createEntry({ result: BetResult.Won, rawAmount: raw('500'), rawPayout: raw('600') }),
    ])

    expect(twoTokens.single).toBe(null)
    expect(twoTokens.byToken).toHaveLength(2)
    expect(twoTokens.betsCount).toBe(2)
    // sorted by turnover desc, and each token is formatted with its own decimals
    expect(twoTokens.byToken[0]!.token.symbol).toBe('USDT')
    expect(twoTokens.byToken[0]!.turnover).toBe('500')
    expect(twoTokens.byToken[1]!.token.symbol).toBe('WETH')
    expect(twoTokens.byToken[1]!.turnover).toBe('1')
    expect(twoTokens.byToken[1]!.returns).toBe('2.5')
  })

  it('lowercases the token address used as the bucket key', () => {
    const { byToken } = calcBetsReport([
      createEntry({ token: { ...USDT, address: USDT.address.toUpperCase() as Address } }),
      createEntry(),
    ])

    expect(byToken).toHaveLength(1)
    expect(byToken[0]!.token.address).toBe(USDT.address)
  })

  it('still counts a redeemed winning bet, because the raw payout survives redemption', () => {
    const { single } = calcBetsReport([
      createEntry({ result: BetResult.Won, rawAmount: raw('100'), rawPayout: raw('126.86058') }),
    ])

    expect(single!.returns).toBe('126.86058')
    expect(single!.profit).toBe('26.86058')
    expect(single!.roi).toBe(26.86)
  })

  it('produces a JSON-safe result, since consumers dehydrate it for SSR', () => {
    const result = calcBetsReport([
      createEntry({ result: BetResult.Won, rawAmount: raw('100'), rawPayout: raw('150') }),
      createEntry({ isFreebet: true, status: GraphBetStatus.Accepted, result: null, rawPayout: null }),
      createEntry({ token: WETH, rawAmount: raw('1', WETH), rawPayout: raw('2', WETH) }),
    ])

    expect(() => JSON.stringify(result)).not.toThrow()
    expect(JSON.parse(JSON.stringify(result))).toEqual(result)
  })
})
