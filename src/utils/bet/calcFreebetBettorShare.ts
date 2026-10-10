export type CalcFreebetBettorShareParams = {
  /** the bet's payout as the pool records it, token base units */
  payout: bigint
  /** the freebet's stake, token base units */
  amount: bigint
  /** the freebet's returnable flag; null or undefined counts as returnable */
  isAmountReturnable?: boolean | null
}

/**
 * Calculates what a freebet bet pays the bettor, in token base units.
 *
 * The liquidity pool pays a freebet's whole payout to the freebet contract, not to the bettor, and
 * that contract splits it between the bettor and the freebet fund:
 *
 * - when the payout is no greater than the stake, the bettor receives nothing and all of it goes back
 *   to the fund - a lost freebet pays 0 and a canceled one pays back exactly its stake;
 * - when the freebet's amount is returnable, the stake goes back to the fund and the bettor receives
 *   the payout less the stake;
 * - otherwise the bettor receives the whole payout.
 *
 * A freebet whose returnable flag is absent is valued as returnable: that is the smaller of the two
 * shares, so a client never shows the bettor more than they receive, and it is how the subgraph's
 * per-bettor freebet totals value such a freebet too.
 *
 * Pure bigint math over base units, so nothing is rounded.
 *
 * @example
 * import { parseUnits } from 'viem'
 * import { calcFreebetBettorShare } from '@azuro-org/toolkit'
 *
 * // a returnable freebet of 1 USDT that won at 1.5: the pool pays 1.5, the bettor receives 0.5
 * const share = calcFreebetBettorShare({
 *   payout: parseUnits('1.5', 6),
 *   amount: parseUnits('1', 6),
 *   isAmountReturnable: true,
 * })
 * */
export const calcFreebetBettorShare = (
  { payout, amount, isAmountReturnable }: CalcFreebetBettorShareParams
): bigint => {
  if (payout <= amount) {
    return 0n
  }

  if (isAmountReturnable === false) {
    return payout
  }

  return payout - amount
}
