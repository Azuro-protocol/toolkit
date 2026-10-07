import { formatUnits, type Address } from 'viem'

import { calcFreebetBettorShare } from './calcFreebetBettorShare'
import { BetResult, BetStatus as GraphBetStatus } from '../../docs/bets/types'


export type BetsReportToken = {
  address: Address
  decimals: number
  symbol: string | null
}

/**
 * One leg of a bet. `isCanceled` is resolved by the caller from the leg's own result, because how a
 * void is recorded is a data-source concern: a v3 leg is voided exactly when its selection result is
 * `Canceled`.
 * */
export type BetsReportSelection = {
  /**
   * @deprecated ignored: the report reads the payout recorded for the bet and never prices it from
   * the odds of its legs
   * */
  odds?: string
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
  /**
   * Whether a freebet's stake goes back to the freebet fund when it wins, which decides the bettor's
   * share of its payout - see `calcFreebetBettorShare`. Null or absent counts as returnable. Ignored
   * on a bet funded by the bettor.
   * */
  isFreebetAmountReturnable?: boolean | null
  /**
   * @deprecated ignored: `rawPayout` already holds the amount actually paid once the bet is redeemed,
   * so the report reads it whether the bet is redeemed or not
   * */
  isRedeemed: boolean
  /**
   * @deprecated ignored: the report reads the payout recorded for the bet, which is already priced
   * by the rules in force when the bet was placed
   * */
  createdAt?: number
  /** integer string, token base units */
  rawAmount: string
  /**
   * integer string, token base units: the payout recorded for the bet, priced over its surviving legs
   * and, once the bet is redeemed, the amount actually paid. A freebet's goes to the freebet contract,
   * which passes the bettor only a share of it.
   * */
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
  /** `returns` less `turnover` on the own-funds row, `returns` itself on the freebet line */
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
   * Freebet-funded bets, excluded from every figure above. A freebet's payout goes to the freebet
   * contract, which passes the bettor only a share of it (see `calcFreebetBettorShare`), so this line
   * reports the freebets' stakes as `turnover`, the bettor's shares as `returns`, and a `profit` equal
   * to `returns`: the bettor staked none of their own money, so whatever they received is their gain.
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

/**
 * What a bet returned to the bettor.
 *
 * A won or lost bet reads the payout recorded for it, and that payout is never rebuilt here: it is
 * already priced over the legs that survived, with a voided leg left out, and once the bet is redeemed
 * it is the amount actually paid. A freebet's payout goes to the freebet contract rather than to the
 * bettor, so a freebet returns only the bettor's share of it - nothing when it lost. A cashed-out bet
 * returns what the cash-out paid.
 * */
const getEntryReturns = (entry: BetsReportEntry, entryClass: BetsReportEntryClass): bigint => {
  if (entryClass === 'pending' || entryClass === 'canceled') {
    return 0n
  }

  if (entryClass === 'cashedOut') {
    return BigInt(entry.rawCashoutPayout ?? '0')
  }

  const payout = BigInt(entry.rawPayout ?? '0')

  if (entry.isFreebet) {
    return calcFreebetBettorShare({
      payout,
      amount: BigInt(entry.rawAmount),
      isAmountReturnable: entry.isFreebetAmountReturnable,
    })
  }

  return payout
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

const toMoney = (accumulator: BetsReportAccumulator, decimals: number, profit: bigint): BetsReportMoney => {
  const { turnover, returns, atStake, refunded } = accumulator

  return {
    turnover: formatUnits(turnover, decimals),
    returns: formatUnits(returns, decimals),
    profit: formatUnits(profit, decimals),
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
    ...toMoney(bucket, token.decimals, returns - turnover),
    roi: turnover > 0n ? Number((returns - turnover) * 10000n / turnover) / 100 : null,
    freebet: {
      count: freebet.betsCount,
      canceledCount: freebet.canceledCount,
      // the bettor staked nothing of their own on a freebet, so all it returned them is profit
      ...toMoney(freebet, token.decimals, freebet.returns),
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
 * A settled bet returns the payout recorded for it, and a cashed-out one what the cash-out paid.
 * Pending bets are excluded from ROI and surfaced as `atStake`. Voided bets are excluded from it
 * too and surfaced as `refunded`: the stake came straight back, so counting it as turnover would
 * pull every ROI toward zero by exactly how unlucky a bettor was with cancellations. Freebet-funded
 * bets are excluded from every main figure and reported on their own line, valued at the share of
 * their payout the bettor receives - see `calcFreebetBettorShare`.
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
