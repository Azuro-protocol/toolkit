import { parseUnits, type Address } from 'viem'
import { describe, expect, it } from 'vitest'

import { calcBetsReport, type BetsReportEntry, type BetsReportToken } from './calcBetsReport'
import { BetResult, BetStatus as GraphBetStatus } from '../../docs/bets/types'
import { MARGIN_APPLIED_AT } from '../../config'


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
  isRedeemed: false,
  rawAmount: raw('100'),
  rawPayout: raw('126.86058'),
  rawCashoutPayout: null,
  selections: [ { isCanceled: false } ],
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

  it('keeps a voided bet out of turnover and returns and reports it as refunded', () => {
    const { single, betsCount } = calcBetsReport([
      createEntry({
        status: GraphBetStatus.Canceled,
        result: null,
        rawAmount: raw('41.3'),
        rawPayout: raw('41.3'),
      }),
    ])

    expect(betsCount).toBe(1)
    expect(single!.betsCount).toBe(1)
    expect(single!.canceledCount).toBe(1)
    expect(single!.settledCount).toBe(0)
    expect(single!.refunded).toBe('41.3')
    expect(single!.turnover).toBe('0')
    expect(single!.returns).toBe('0')
    expect(single!.roi).toBe(null)
  })

  it('does not let voided bets dilute the ROI of the bets that were actually at risk', () => {
    const { single } = calcBetsReport([
      createEntry({ result: BetResult.Won, rawAmount: raw('100'), rawPayout: raw('150') }),
      createEntry({ result: BetResult.Lost, rawAmount: raw('100'), rawPayout: raw('0') }),
      createEntry({
        status: GraphBetStatus.Canceled,
        result: null,
        rawAmount: raw('800'),
        rawPayout: raw('800'),
      }),
    ])

    expect(single!.betsCount).toBe(3)
    expect(single!.settledCount).toBe(2)
    expect(single!.canceledCount).toBe(1)
    expect(single!.turnover).toBe('200')
    expect(single!.returns).toBe('150')
    expect(single!.profit).toBe('-50')
    // the 800 refund would have pulled this to -5% if it counted as turnover
    expect(single!.roi).toBe(-25)
    expect(single!.refunded).toBe('800')
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

    // a freebet with no returnable flag is valued as returnable: the bettor receives 49.599 less the 30 stake
    expect(single!.freebet.count).toBe(2)
    expect(single!.freebet.turnover).toBe('30')
    expect(single!.freebet.returns).toBe('19.599')
    expect(single!.freebet.profit).toBe(single!.freebet.returns)
    expect(single!.freebet.atStake).toBe('10')
  })

  it('keeps a voided freebet out of the freebet turnover and returns too', () => {
    const { single } = calcBetsReport([
      createEntry({
        isFreebet: true,
        result: BetResult.Won,
        rawAmount: raw('30'),
        rawPayout: raw('49.599'),
      }),
      createEntry({
        isFreebet: true,
        status: GraphBetStatus.Canceled,
        result: null,
        rawAmount: raw('25'),
        rawPayout: raw('25'),
      }),
    ])

    expect(single!.freebet.count).toBe(2)
    expect(single!.freebet.canceledCount).toBe(1)
    expect(single!.freebet.turnover).toBe('30')
    expect(single!.freebet.returns).toBe('19.599')
    expect(single!.freebet.profit).toBe(single!.freebet.returns)
    expect(single!.freebet.refunded).toBe('25')
    expect(single!.canceledCount).toBe(0)
  })

  it('values a returnable freebet at its payout less the stake and reports that as its profit', () => {
    const { single } = calcBetsReport([
      createEntry({
        isFreebet: true,
        isFreebetAmountReturnable: true,
        result: BetResult.Won,
        rawAmount: raw('1'),
        rawPayout: raw('1.5'),
      }),
    ])

    expect(single!.freebet.turnover).toBe('1')
    expect(single!.freebet.returns).toBe('0.5')
    expect(single!.freebet.profit).toBe(single!.freebet.returns)
  })

  it('values a non-returnable freebet at its whole payout', () => {
    const { single } = calcBetsReport([
      createEntry({
        isFreebet: true,
        isFreebetAmountReturnable: false,
        result: BetResult.Won,
        rawAmount: raw('1'),
        rawPayout: raw('1.5'),
      }),
    ])

    expect(single!.freebet.turnover).toBe('1')
    expect(single!.freebet.returns).toBe('1.5')
    expect(single!.freebet.profit).toBe(single!.freebet.returns)
  })

  it('values a freebet with no returnable flag as returnable', () => {
    const { single } = calcBetsReport([
      createEntry({
        isFreebet: true,
        isFreebetAmountReturnable: null,
        result: BetResult.Won,
        rawAmount: raw('1'),
        rawPayout: raw('1.5'),
      }),
      createEntry({
        isFreebet: true,
        result: BetResult.Won,
        rawAmount: raw('1'),
        rawPayout: raw('1.5'),
      }),
    ])

    expect(single!.freebet.turnover).toBe('2')
    expect(single!.freebet.returns).toBe('1')
    expect(single!.freebet.profit).toBe(single!.freebet.returns)
  })

  it('counts a canceled freebet as refunded and adds nothing to the freebet returns', () => {
    // the payout of a canceled freebet is exactly its stake, all of which goes back to the freebet fund
    const { single } = calcBetsReport([
      createEntry({
        isFreebet: true,
        isFreebetAmountReturnable: false,
        status: GraphBetStatus.Canceled,
        result: null,
        rawAmount: raw('1'),
        rawPayout: raw('1'),
      }),
    ])

    expect(single!.freebet.canceledCount).toBe(1)
    expect(single!.freebet.refunded).toBe('1')
    expect(single!.freebet.turnover).toBe('0')
    expect(single!.freebet.returns).toBe('0')
    expect(single!.freebet.profit).toBe(single!.freebet.returns)
    expect(single!.refunded).toBe('0')
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

  it('reads the recorded payout of a won bet whatever its creation time and its legs', () => {
    // the recorded payout is already priced by the rules in force when the bet was placed and leaves a
    // voided leg out, so two bets recorded at the same payout return exactly that, either side of a
    // change in how combos are priced
    const selections = [
      { odds: '2', isCanceled: false },
      { odds: '1.5', isCanceled: false },
      { odds: '4', isCanceled: true },
    ]

    const { single } = calcBetsReport([
      createEntry({
        result: BetResult.Won,
        isRedeemed: false,
        createdAt: MARGIN_APPLIED_AT - 1,
        rawAmount: raw('10'),
        rawPayout: raw('30'),
        selections,
      }),
      createEntry({
        result: BetResult.Won,
        isRedeemed: false,
        createdAt: MARGIN_APPLIED_AT,
        rawAmount: raw('10'),
        rawPayout: raw('30'),
        selections,
      }),
    ])

    expect(single!.settledCount).toBe(2)
    expect(single!.turnover).toBe('20')
    expect(single!.returns).toBe('60')
  })

  it('treats a combo whose every leg was voided as a void, whatever the bet says about itself', () => {
    const { single } = calcBetsReport([
      createEntry({
        result: BetResult.Won,
        isRedeemed: false,
        rawAmount: raw('12'),
        rawPayout: raw('80'),
        selections: [
          { odds: '2', isCanceled: true },
          { odds: '3.33', isCanceled: true },
        ],
      }),
    ])

    // settling it at breakeven instead would put a stake that was never at risk back into turnover
    expect(single!.canceledCount).toBe(1)
    expect(single!.settledCount).toBe(0)
    expect(single!.refunded).toBe('12')
    expect(single!.turnover).toBe('0')
    expect(single!.returns).toBe('0')
    expect(single!.roi).toBe(null)
  })

  it('treats a single whose only leg was voided as a void, not as a bet still running', () => {
    // a leg can be voided while its condition stays resolved, which leaves the bet with no result
    const { single } = calcBetsReport([
      createEntry({
        status: GraphBetStatus.Resolved,
        result: null,
        rawAmount: raw('9'),
        rawPayout: raw('9'),
        selections: [ { odds: '1.9', isCanceled: true } ],
      }),
    ])

    expect(single!.canceledCount).toBe(1)
    expect(single!.pendingCount).toBe(0)
    expect(single!.refunded).toBe('9')
    expect(single!.atStake).toBe('0')
  })

  it('leaves a lost combo with a voided leg at a zero return', () => {
    const { single } = calcBetsReport([
      createEntry({
        result: BetResult.Lost,
        rawAmount: raw('60.25'),
        rawPayout: raw('0'),
        selections: [
          { odds: '1.9', isCanceled: false },
          { odds: '2.4', isCanceled: true },
        ],
      }),
    ])

    expect(single!.returns).toBe('0')
    expect(single!.profit).toBe('-60.25')
    expect(single!.settledCount).toBe(1)
  })

  it('pays a cashed out combo with a voided leg at the price the bettor took', () => {
    const { single } = calcBetsReport([
      createEntry({
        isCashedOut: true,
        result: BetResult.Won,
        rawAmount: raw('20'),
        rawPayout: raw('90'),
        rawCashoutPayout: raw('31.4'),
        selections: [
          { odds: '2.2', isCanceled: false },
          { odds: '2.05', isCanceled: true },
        ],
      }),
    ])

    expect(single!.returns).toBe('31.4')
    expect(single!.canceledCount).toBe(0)
    expect(single!.settledCount).toBe(1)
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
