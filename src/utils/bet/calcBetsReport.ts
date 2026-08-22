import { formatUnits, parseUnits, type Address } from 'viem'

import { BetResult, BetStatus as GraphBetStatus } from '../../docs/bets/types'
import { calcMinOdds } from '../calcMinOdds'
import { ODDS_DECIMALS } from '../../config'


export type BetsReportToken = {
  address: Address
  decimals: number
  symbol: string | null
}

/**
 * One leg of a bet. `isCanceled` is already resolved by the caller, because which of the subgraph's
 * three void signals applies is a data-source concern - see `isSelectionCanceled`.
 * */
export type BetsReportSelection = {
  /** decimal string, as recorded by the protocol: the feed fee is already applied to it */
  odds: string
  isCanceled: boolean
}

/**
 * Domain shape of a single bet, deliberately not the generated query type, so that the reducer
 * stays testable with literals and survives a change of data source.
 * */
export type BetsReportEntry = {
  id: string
  status: GraphBetStatus
  result: BetResult | null
  isCashedOut: boolean
  isFreebet: boolean
  /** once redeemed, `rawPayout` holds the amount actually paid out on chain */
  isRedeemed: boolean
  /** integer string, token base units */
  rawAmount: string
  /** raw value as recorded by the protocol, never masked by redemption */
  rawPayout: string | null
  rawCashoutPayout: string | null
  /** every leg of the bet - a single is a bet with exactly one of them */
  selections: BetsReportSelection[]
  token: BetsReportToken
}

/** The money figures, shared by the own-funds row and the freebet line inside it. */
type BetsReportMoney = {
  /** decimal strings, so the whole result stays JSON-safe */
  turnover: string
  returns: string
  profit: string
  /** sum of the stakes of bets that have not settled yet */
  atStake: string
  /**
   * Sum of the stakes returned by fully voided bets. Excluded from every figure above: the stake
   * came straight back, so the bet was never at risk and cannot say anything about performance.
   * */
  refunded: string
}

export type BetsReportRow = BetsReportMoney & {
  token: BetsReportToken
  /** own-funds bets only, freebet-funded ones are counted in `freebet.count` */
  betsCount: number
  /** `betsCount` splits into these three */
  settledCount: number
  pendingCount: number
  canceledCount: number
  /** percent; null when turnover is 0, never NaN or Infinity */
  roi: number | null
  /**
   * Freebet-funded bets, excluded from every figure above: the bettor staked none of their own
   * money, so `returns` is their gross gain while `profit` compares it to the notional stake.
   * */
  freebet: BetsReportMoney & {
    count: number
    canceledCount: number
  }
}

export type BetsReportResult = {
  /** sorted by turnover desc */
  byToken: BetsReportRow[]
  /** non-null iff exactly one token is present, lets the UI collapse to a single row */
  single: BetsReportRow | null
  /** every bet in the report, freebet-funded and voided ones included */
  betsCount: number
}

type BetsReportEntryClass = 'cashedOut' | 'canceled' | 'won' | 'lost' | 'pending'

type BetsReportAccumulator = {
  betsCount: number
  settledCount: number
  pendingCount: number
  canceledCount: number
  turnover: bigint
  returns: bigint
  atStake: bigint
  refunded: bigint
}

type BetsReportBucket = BetsReportAccumulator & {
  token: BetsReportToken
  freebet: BetsReportAccumulator
}

const isEveryLegCanceled = ({ selections }: BetsReportEntry): boolean => (
  selections.length > 0 && selections.every(({ isCanceled }) => isCanceled)
)

/**
 * `isCashedOut` must be tested before `result` and `status`: a cashed-out bet keeps a notional
 * `payout` of its own, which later resolves to Won or Canceled as if it had never been cashed out.
 * Reading that `payout` would credit the bet with a settlement it never reached rather than the
 * amount the bettor actually took.
 *
 * A cashed-out bet stays a real trade even when it is voided afterwards - the bettor took a price
 * and the money moved - so only a bet voided while it was still running counts as `canceled`.
 *
 * Bet-level `Canceled` is the signal on a voided bet, the ones voided leg by leg included. A bet
 * whose legs were nonetheless all voided is just as void, whatever its own status says, and must not
 * be left to settle at breakeven: that would put a stake that was never at risk back into turnover,
 * which is the very thing keeping voids out of it is for.
 * */
const classifyEntry = (entry: BetsReportEntry): BetsReportEntryClass => {
  if (entry.isCashedOut) {
    return 'cashedOut'
  }

  if (entry.status === GraphBetStatus.Canceled || isEveryLegCanceled(entry)) {
    return 'canceled'
  }

  if (entry.result === BetResult.Won) {
    return 'won'
  }

  if (entry.result === BetResult.Lost) {
    return 'lost'
  }

  return 'pending'
}

const ODDS_FACTOR = 10n ** BigInt(ODDS_DECIMALS)

/**
 * What a won bet returned.
 *
 * The recorded `payout` is used wherever it is trustworthy, and it must never be reconstructed from
 * `settledOdds`: that field is the raw product of the leg odds with the feed fee compounded once
 * per leg, which is not how a combo is priced, and it is not reduced when a leg is voided either.
 *
 * The one shape where `payout` is wrong is a **combo with at least one voided leg that has not been
 * redeemed yet**: until redemption it still credits the voided leg's odds as if that leg had won,
 * which is far too much to carry into a ROI.
 *
 * Those are rebuilt from the surviving legs with `calcMinOdds`, which is how a combo is actually
 * priced: the 1% fee is applied by the feed to every outcome, so for a combo it is removed per leg
 * and re-applied once to the product instead of compounding. A plain product of the surviving odds
 * is not equivalent - it understates the payout, by more the more legs the bet has.
 *
 * Redemption replaces `payout` with the amount actually paid on chain, so a redeemed bet always
 * reads that value: the truth wins over any reconstruction.
 * */
const getWonReturns = (entry: BetsReportEntry): bigint => {
  const rawPayout = BigInt(entry.rawPayout ?? '0')

  const isCombo = entry.selections.length > 1
  const hasCanceledSelection = entry.selections.some(({ isCanceled }) => isCanceled)

  if (!isCombo || !hasCanceledSelection || entry.isRedeemed) {
    return rawPayout
  }

  const survivedOdds = entry.selections
    .filter(({ isCanceled }) => !isCanceled)
    .map(({ odds }) => Number(odds))

  // `classifyEntry` sends a bet with no surviving leg to `canceled`, so this is the floor under that
  // rather than a case of its own: an empty list must never be priced, because `calcMinOdds` would
  // then return the bare combo fee and hand back 99% of the stake
  if (!survivedOdds.length) {
    return BigInt(entry.rawAmount)
  }

  const totalOdds = parseUnits(calcMinOdds({ odds: survivedOdds, slippage: 0 }), ODDS_DECIMALS)

  return BigInt(entry.rawAmount) * totalOdds / ODDS_FACTOR
}

const getEntryReturns = (entry: BetsReportEntry, entryClass: BetsReportEntryClass): bigint => {
  if (entryClass === 'pending' || entryClass === 'canceled') {
    return 0n
  }

  if (entryClass === 'cashedOut') {
    return BigInt(entry.rawCashoutPayout ?? '0')
  }

  if (entryClass === 'won') {
    return getWonReturns(entry)
  }

  return BigInt(entry.rawPayout ?? '0')
}

const createAccumulator = (): BetsReportAccumulator => ({
  betsCount: 0,
  settledCount: 0,
  pendingCount: 0,
  canceledCount: 0,
  turnover: 0n,
  returns: 0n,
  atStake: 0n,
  refunded: 0n,
})

const createBucket = (token: BetsReportToken): BetsReportBucket => ({
  ...createAccumulator(),
  token,
  freebet: createAccumulator(),
})

/**
 * Own-funds and freebet-funded bets are aggregated by the same rules into the same shape - they
 * differ only in which of the two accumulators they land in - so the rules are written once.
 * */
const accumulate = (
  target: BetsReportAccumulator,
  entryClass: BetsReportEntryClass,
  amount: bigint,
  returns: bigint
): void => {
  target.betsCount += 1

  if (entryClass === 'pending') {
    target.pendingCount += 1
    target.atStake += amount

    return
  }

  // a void returns the stake and nothing else, so it is reported rather than aggregated. The stake
  // is the figure to report: `payout` equals it on a voided bet, and the stake stays right even if
  // that ever stops holding
  if (entryClass === 'canceled') {
    target.canceledCount += 1
    target.refunded += amount

    return
  }

  target.settledCount += 1
  target.turnover += amount
  target.returns += returns
}

const SORT_DECIMALS = 18

/**
 * Rows are ordered by turnover in token units, not in base units: two tokens can carry different
 * `decimals`, so raw amounts are not comparable with each other. Rescaling to a common precision
 * keeps the comparison exact instead of routing it through a float.
 * */
const toSortableTurnover = ({ turnover, token }: BetsReportBucket): bigint => {
  const exponent = SORT_DECIMALS - token.decimals

  if (exponent >= 0) {
    return turnover * 10n ** BigInt(exponent)
  }

  return turnover / 10n ** BigInt(-exponent)
}

const toMoney = (accumulator: BetsReportAccumulator, decimals: number): BetsReportMoney => {
  const { turnover, returns, atStake, refunded } = accumulator

  return {
    turnover: formatUnits(turnover, decimals),
    returns: formatUnits(returns, decimals),
    profit: formatUnits(returns - turnover, decimals),
    atStake: formatUnits(atStake, decimals),
    refunded: formatUnits(refunded, decimals),
  }
}

const toRow = (bucket: BetsReportBucket): BetsReportRow => {
  const { token, turnover, returns, freebet } = bucket

  return {
    token,
    betsCount: bucket.betsCount,
    settledCount: bucket.settledCount,
    pendingCount: bucket.pendingCount,
    canceledCount: bucket.canceledCount,
    ...toMoney(bucket, token.decimals),
    roi: turnover > 0n ? Number((returns - turnover) * 10000n / turnover) / 100 : null,
    freebet: {
      count: freebet.betsCount,
      canceledCount: freebet.canceledCount,
      ...toMoney(freebet, token.decimals),
    },
  }
}

/**
 * Aggregates bets into a per-token turnover / returns / profit / ROI report.
 *
 * Pure: no network, no framework. All money math runs in bigint over the raw base-unit values and
 * is formatted to decimal strings only at the boundary, so nothing here can reach a query cache as
 * a bigint (`JSON.stringify` throws on those).
 *
 * Pending bets are excluded from ROI and surfaced as `atStake`. Voided bets are excluded from it
 * too and surfaced as `refunded`: the stake came straight back, so counting it as turnover would
 * pull every ROI toward zero by exactly how unlucky a bettor was with cancellations. Freebet-funded
 * bets are excluded from every main figure and reported on their own line.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/getBetsReport
 *
 * @example
 * import { calcBetsReport } from '@azuro-org/toolkit'
 *
 * const report = calcBetsReport(entries)
 * const row = report.single ?? report.byToken[0]
 * */
export const calcBetsReport = (entries: BetsReportEntry[]): BetsReportResult => {
  const buckets = new Map<string, BetsReportBucket>()

  entries.forEach((entry) => {
    const address = entry.token.address.toLowerCase() as Address

    let bucket = buckets.get(address)

    if (!bucket) {
      bucket = createBucket({
        address,
        decimals: entry.token.decimals,
        symbol: entry.token.symbol,
      })
      buckets.set(address, bucket)
    }

    if (!bucket.token.symbol && entry.token.symbol) {
      bucket.token.symbol = entry.token.symbol
    }

    const entryClass = classifyEntry(entry)

    accumulate(
      entry.isFreebet ? bucket.freebet : bucket,
      entryClass,
      BigInt(entry.rawAmount),
      getEntryReturns(entry, entryClass)
    )
  })

  const byToken = Array.from(buckets.values())
    .sort((a, b) => {
      const aTurnover = toSortableTurnover(a)
      const bTurnover = toSortableTurnover(b)

      if (aTurnover === bTurnover) {
        return 0
      }

      return aTurnover > bTurnover ? -1 : 1
    })
    .map(toRow)

  return {
    byToken,
    single: byToken.length === 1 ? byToken[0]! : null,
    betsCount: entries.length,
  }
}
