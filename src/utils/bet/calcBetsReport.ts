import { formatUnits, type Address } from 'viem'

import { BetResult, BetStatus as GraphBetStatus } from '../../docs/bets/types'


export type BetsReportToken = {
  address: Address
  decimals: number
  symbol: string | null
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
  /** integer string, token base units */
  rawAmount: string
  /** raw value as recorded by the protocol, never masked by redemption */
  rawPayout: string | null
  rawCashoutPayout: string | null
  token: BetsReportToken
}

export type BetsReportRow = {
  token: BetsReportToken
  /** own-funds bets only, freebet-funded ones are counted in `freebet.count` */
  betsCount: number
  settledCount: number
  pendingCount: number
  /** decimal strings, so the whole result stays JSON-safe */
  turnover: string
  returns: string
  profit: string
  /** percent; null when turnover is 0, never NaN or Infinity */
  roi: number | null
  /** sum of the stakes of unsettled, non-freebet bets */
  atStake: string
  /**
   * Freebet-funded bets, excluded from every figure above: the bettor staked none of their own
   * money, so `returns` is their gross gain while `profit` compares it to the notional stake.
   * */
  freebet: { count: number, turnover: string, returns: string, profit: string, atStake: string }
}

export type BetsReportResult = {
  /** sorted by turnover desc */
  byToken: BetsReportRow[]
  /** non-null iff exactly one token is present, lets the UI collapse to a single row */
  single: BetsReportRow | null
  /** every bet in the report, freebet-funded ones included */
  betsCount: number
}

type BetsReportEntryClass = 'cashedOut' | 'canceled' | 'won' | 'lost' | 'pending'

type BetsReportBucket = {
  token: BetsReportToken
  betsCount: number
  settledCount: number
  pendingCount: number
  turnover: bigint
  returns: bigint
  atStake: bigint
  freebet: {
    count: number
    turnover: bigint
    returns: bigint
    atStake: bigint
  }
}

/**
 * `isCashedOut` must be tested before `result` and `status`: a cashed-out bet keeps a notional
 * `payout` of its own, which later resolves to Won or Canceled as if it had never been cashed out.
 * Observed live: a bet cashed out for 114.84 on a 116 stake also carries a `payout` of 240.12.
 * Reading that `payout` would credit more than double what the bettor actually received.
 * */
const classifyEntry = (entry: BetsReportEntry): BetsReportEntryClass => {
  if (entry.isCashedOut) {
    return 'cashedOut'
  }

  if (entry.status === GraphBetStatus.Canceled) {
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
 * A settled bet's return is always read from the protocol's own recorded value. It must never be
 * reconstructed from odds: `payout` is not `amount * settledOdds`, and for a combo with cancelled
 * legs `settledOdds` keeps the full original odds while `payout` correctly voids the cancelled leg.
 *
 * KNOWN UPSTREAM INACCURACY — `rawPayout` is overstated for one specific shape of bet:
 * a **combo that won, has at least one cancelled leg, and has not been redeemed yet**. For those,
 * the indexer records the full pre-cancellation potential payout at settlement and only replaces it
 * with the true on-chain amount once the bettor redeems. The overstatement scales with the cancelled
 * leg's odds and has been observed above +100%.
 *
 * This is accepted here on purpose: the value self-corrects on redemption, and every other bet shape
 * is exact. Detecting the case needs `result`, `isRedeemed` and the cancelled-sub-bet count; the only
 * available correction would be `amount * product(surviving leg odds)`, which understates by the
 * margin the protocol refunds when a combo loses a leg (measured at 0.6%-7.8%).
 *
 * WHEN THE INDEXER IS FIXED to record the settled payout at settlement time rather than at
 * redemption: no code change is required here — the numbers simply become exact. Delete this note
 * and the matching caveat in the report docs.
 * */
const getEntryReturns = (entry: BetsReportEntry, entryClass: BetsReportEntryClass): bigint => {
  if (entryClass === 'pending') {
    return 0n
  }

  if (entryClass === 'cashedOut') {
    return BigInt(entry.rawCashoutPayout ?? '0')
  }

  return BigInt(entry.rawPayout ?? '0')
}

const createBucket = (token: BetsReportToken): BetsReportBucket => ({
  token,
  betsCount: 0,
  settledCount: 0,
  pendingCount: 0,
  turnover: 0n,
  returns: 0n,
  atStake: 0n,
  freebet: {
    count: 0,
    turnover: 0n,
    returns: 0n,
    atStake: 0n,
  },
})

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

const toRow = (bucket: BetsReportBucket): BetsReportRow => {
  const { token, turnover, returns, atStake, freebet } = bucket

  const profit = returns - turnover
  const freebetProfit = freebet.returns - freebet.turnover

  return {
    token,
    betsCount: bucket.betsCount,
    settledCount: bucket.settledCount,
    pendingCount: bucket.pendingCount,
    turnover: formatUnits(turnover, token.decimals),
    returns: formatUnits(returns, token.decimals),
    profit: formatUnits(profit, token.decimals),
    roi: turnover > 0n ? Number(profit * 10000n / turnover) / 100 : null,
    atStake: formatUnits(atStake, token.decimals),
    freebet: {
      count: freebet.count,
      turnover: formatUnits(freebet.turnover, token.decimals),
      returns: formatUnits(freebet.returns, token.decimals),
      profit: formatUnits(freebetProfit, token.decimals),
      atStake: formatUnits(freebet.atStake, token.decimals),
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
 * Pending bets are excluded from ROI and surfaced as `atStake`. Freebet-funded bets are excluded
 * from every main figure and reported on their own line.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/calcBetsReport
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
    const amount = BigInt(entry.rawAmount)
    const returns = getEntryReturns(entry, entryClass)

    if (entry.isFreebet) {
      bucket.freebet.count += 1

      if (entryClass === 'pending') {
        bucket.freebet.atStake += amount
      }
      else {
        bucket.freebet.turnover += amount
        bucket.freebet.returns += returns
      }

      return
    }

    bucket.betsCount += 1

    if (entryClass === 'pending') {
      bucket.pendingCount += 1
      bucket.atStake += amount

      return
    }

    bucket.settledCount += 1
    bucket.turnover += amount
    bucket.returns += returns
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
