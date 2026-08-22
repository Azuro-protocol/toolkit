import { type Address } from 'viem'

import { calcBetsReport, type BetsReportEntry, type BetsReportResult } from './calcBetsReport'
import { normalizeBetsFilter, toGraphBetsWhere, type BetsFilter } from './betsFilter'
import { gqlRequest } from '../../helpers/gqlRequest'
import {
  BetsReportDocument,
  type BetsReportQuery,
  type BetsReportQueryVariables,
} from '../../docs/bets/betsReport'
import { type V3_Bet_Filter as Bet_Filter } from '../../docs/bets/types'
import { chainsData, type ChainId } from '../../config'


export type GetBetsReportParams = {
  chainId: ChainId
  filter: BetsFilter
  signal?: AbortSignal
  /** default: 1000, the maximum page size a subgraph accepts */
  pageSize?: number
  /** default: 50, which caps the walk at 50 000 bets */
  maxPages?: number
}

export type GetBetsReportResult = BetsReportResult & {
  /** true when `maxPages` was hit: the figures are a lower bound and the UI must surface it */
  isTruncated: boolean
}

type BetsReportQueryBet = BetsReportQuery['v3Bets'][number]

/** The Graph rejects `skip` above this. */
const MAX_SKIP = 5000

const toReportEntry = (
  bet: BetsReportQueryBet,
  betTokenAddress: string,
  betTokenSymbol: string
): BetsReportEntry => {
  const { id, status, result, isCashedOut, isFreebet, rawAmount, rawPayout, cashout, core } = bet

  const address = core.liquidityPool.token.toLowerCase() as Address

  return {
    id,
    status,
    result: result ?? null,
    isCashedOut,
    isFreebet,
    rawAmount,
    rawPayout: rawPayout ?? null,
    rawCashoutPayout: cashout?.rawPayout ?? null,
    token: {
      address,
      decimals: core.liquidityPool.tokenDecimals,
      symbol: address === betTokenAddress ? betTokenSymbol : null,
    },
  }
}

/**
 * Fetches every bet matching the filter and aggregates it into a turnover / returns / ROI report.
 *
 * The bets are walked with a timestamp cursor rather than `skip`, which sidesteps the subgraph's
 * `skip <= 5000` cap and makes the report exact over the bettor's whole history, not just over the
 * pages a list happens to have loaded. The `where` is built by the same `toGraphBetsWhere` a bet
 * list uses, so a report always describes exactly the bets the list shows.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bet/getBetsReport
 *
 * @example
 * import { getBetsReport } from '@azuro-org/toolkit'
 *
 * const report = await getBetsReport({
 *   chainId: 137,
 *   filter: { bettor: '0x...', status: BetStatusFilter.Settled },
 * })
 * */
export const getBetsReport = async (params: GetBetsReportParams): Promise<GetBetsReportResult> => {
  const { chainId, filter, signal, maxPages = 50 } = params

  // The Graph rejects `first` above 1000 with a validation error and a null payload, which would
  // surface here as an unreadable destructuring failure rather than the real cause.
  const pageSize = Math.min(params.pageSize ?? 1000, 1000)

  const { graphql, betToken } = chainsData[chainId]

  const baseWhere = toGraphBetsWhere(normalizeBetsFilter(filter))
  const betTokenAddress = betToken.address.toLowerCase()

  const seenIds = new Set<string>()
  const entries: BetsReportEntry[] = []

  let cursor: bigint | undefined = undefined
  // how many bets sitting exactly on the cursor timestamp have already been consumed
  let skip = 0
  let page = 0
  let isComplete = false

  while (page < maxPages) {
    // The cursor is `_lte` and never `_lt`: `createdBlockTimestamp` is not unique, so a strict
    // bound would silently drop every bet sharing the boundary timestamp. The resulting overlap is
    // removed by the id set below. `and: [ ... ]` keeps the cursor and a user-supplied upper bound
    // on `createdTo` from overwriting each other in a flat object.
    const where: Bet_Filter = cursor === undefined
      ? baseWhere
      : { and: [ baseWhere, { createdBlockTimestamp_lte: String(cursor) } ] }

    const { v3Bets } = await gqlRequest<BetsReportQuery, BetsReportQueryVariables>({
      url: graphql.bets,
      document: BetsReportDocument,
      variables: {
        first: pageSize,
        skip,
        where,
      },
      signal,
    })

    page += 1

    const bets = v3Bets || []

    let newBetsCount = 0

    bets.forEach((bet) => {
      if (seenIds.has(bet.id)) {
        return
      }

      seenIds.add(bet.id)
      newBetsCount += 1
      entries.push(toReportEntry(bet, betTokenAddress, betToken.symbol))
    })

    if (bets.length < pageSize) {
      isComplete = true

      break
    }

    const lastTimestamp = BigInt(bets[bets.length - 1]!.createdBlockTimestamp)
    const betsOnBoundary = bets.filter((bet) => BigInt(bet.createdBlockTimestamp) === lastTimestamp).length

    // An `_lte` cursor alone cannot page past a group of bets sharing one timestamp that is larger
    // than a page — it would return the same rows forever. Carrying a `skip` for the bets already
    // consumed at the boundary timestamp steps over exactly those and nothing else.
    skip = cursor === lastTimestamp ? skip + betsOnBoundary : betsOnBoundary
    cursor = lastTimestamp

    // The Graph refuses `skip` beyond 5000, so a tie group that large cannot be walked further.
    // Report the result as partial rather than stepping over the bets that were never read.
    if (skip > MAX_SKIP) {
      break
    }
  }

  return {
    ...calcBetsReport(entries),
    isTruncated: !isComplete,
  }
}
