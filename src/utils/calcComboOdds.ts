import { calcMinOdds } from './calcMinOdds'
import { MARGIN_APPLIED_AT, ODDS_DECIMALS } from '../config'


export type CalcComboOddsParams = {
  /** the leg odds as the protocol recorded them; a voided leg must be left out by the caller */
  odds: number[]
  /** unix seconds, when the bet was placed - it decides whether the leg odds carry the feed's fee */
  createdAt: number
}

/**
 * The total odds of a combo, priced the way the protocol prices it.
 *
 * The feed applies its fee to every outcome, so multiplying the leg odds as they are recorded
 * compounds that fee once per leg. A combo has the fee removed from each leg and applied once to the
 * product instead, which is what `calcMinOdds` does with an array of odds.
 *
 * Legs placed before `MARGIN_APPLIED_AT` carry no fee at all, so they are multiplied as they are:
 * removing a fee that was never charged and re-applying it once would compound it in reverse and
 * overstate the odds.
 *
 * An empty list prices at 1 rather than at the bare combo fee, so that a bet with nothing left
 * standing returns its stake. Which legs survived is the caller's question, not this one's.
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

  if (createdAt >= MARGIN_APPLIED_AT) {
    return calcMinOdds({ odds, slippage: 0 })
  }

  return odds.reduce((acc, value) => acc * value, 1).toFixed(ODDS_DECIMALS)
}
