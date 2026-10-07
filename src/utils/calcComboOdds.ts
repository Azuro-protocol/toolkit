import { calcMinOdds } from './calcMinOdds'
import { MARGIN_APPLIED_AT, ODDS_DECIMALS, SINGLE_MARGIN_REMOVED_AT } from '../config'


export type CalcComboOddsParams = {
  /** the leg odds as the protocol recorded them; a voided leg must be left out by the caller */
  odds: number[]
  /**
   * unix seconds, when the bet was placed - it decides whether the leg odds carry the feed's fee and
   * whether a single leg is priced as a combo of one
   * */
  createdAt: number
}

/**
 * The total odds of a bet, priced the way the protocol priced it when the bet was placed.
 *
 * The feed applies its fee to every outcome, so multiplying the leg odds as they are recorded
 * compounds that fee once per leg. A combo has the fee removed from each leg and applied once to the
 * product instead, which is what `calcMinOdds` does with an array of odds.
 *
 * Which rule applies depends on when the bet was placed:
 * - before `MARGIN_APPLIED_AT` the legs carry no fee at all, so they are multiplied as they are:
 * removing a fee that was never charged and re-applying it once would compound it in reverse and
 * overstate the odds;
 * - from `MARGIN_APPLIED_AT` every bet goes through the combo rule, a single leg included, which can
 * move a single leg's odds onto the two-decimal grid the protocol prices on;
 * - from `SINGLE_MARGIN_REMOVED_AT` a single leg is its quoted odds again, while two or more legs keep
 * the combo rule.
 *
 * An empty list prices at 1 rather than at the bare combo fee, so that a bet with nothing left
 * standing returns its stake. Which legs survived is the caller's question, not this one's.
 *
 * @deprecated The bets subgraph records every bet's total odds, potential payout and payout already
 * priced by the protocol's rule. Read a bet's `odds` / `settledOdds` and `potentialPayout` / `payout`
 * (or `rawPotentialPayout` / `rawPayout`) instead of re-pricing its legs on the client.
 *
 * @example
 * import { calcComboOdds } from '@azuro-org/toolkit'
 *
 * const totalOdds = calcComboOdds({ odds: [ 1.5, 2 ], createdAt: bet.createdAt })
 * */
export const calcComboOdds = ({ odds, createdAt }: CalcComboOddsParams): string => {
  if (!odds.length) {
    return (1).toFixed(ODDS_DECIMALS)
  }

  if (createdAt < MARGIN_APPLIED_AT) {
    return odds.reduce((acc, value) => acc * value, 1).toFixed(ODDS_DECIMALS)
  }

  if (odds.length === 1 && createdAt >= SINGLE_MARGIN_REMOVED_AT) {
    return odds[0]!.toFixed(ODDS_DECIMALS)
  }

  return calcMinOdds({ odds, slippage: 0 })
}
