import { formatToFixed } from '../helpers/formatToFixed'
import { ODDS_COMBO_FEE_MODIFIER, ODDS_DECIMALS } from '../config'


export type CalcMinOddsParams = {
  odds: number | number[]
  slippage?: number
}

const adjustSubBetOdds = (value: number) => Math.ceil(+value / ODDS_COMBO_FEE_MODIFIER * 100) / 100

/**
 * Calculates the minimum acceptable odds considering slippage for single or combo bets.
 * For combo bets, applies fee modifiers and multiplies individual odds to calculate total odds.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/utils/calcMinOdds
 *
 * @example
 * import { calcMindOdds } from '@azuro-org/toolkit'
 *
 * // Single bet with 5% slippage
 * const minOdds = calcMindOdds({ odds: 1.5, slippage: 5 })
 *
 * // Combo bet with multiple odds
 * const comboMinOdds = calcMindOdds({ odds: [1.5, 2.0, 1.8], slippage: 5 })
 * */
export const calcMinOdds = (props: CalcMinOddsParams) => {
  if (props.slippage && props.slippage >= 100) {
    return (1).toFixed(ODDS_DECIMALS)
  }

  let totalOdds: number

  if (typeof props.odds === 'number') {
    totalOdds = formatToFixed(props.odds, 2)
  }
  else {
    const comboOdds = props.odds.reduce((acc, odds) => acc * adjustSubBetOdds(odds), 1)
    totalOdds = formatToFixed(comboOdds * ODDS_COMBO_FEE_MODIFIER, 2)
  }

  if (!props.slippage) {
    return totalOdds.toFixed(ODDS_DECIMALS)
  }

  const minOdds = formatToFixed(1 + (totalOdds - 1) * (100 - props.slippage) / 100, 2)

  return minOdds.toFixed(ODDS_DECIMALS)
}
