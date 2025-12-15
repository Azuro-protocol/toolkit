import { formatToFixed } from '../helpers/formatToFixed'
import { ODDS_COMBO_FEE_MODIFIER, ODDS_DECIMALS } from '../config'


type Props = {
  odds: number | number[]
  slippage: number
}

const adjustSubBetOdds = (value: number) => Math.ceil(+value / ODDS_COMBO_FEE_MODIFIER * 100) / 100

export const calcMindOdds = (props: Props) => {
  let totalOdds: number

  if (typeof props.odds === 'number') {
    totalOdds = props.odds
  }
  else {
    const comboOdds = props.odds.reduce((acc, odds) => acc * adjustSubBetOdds(odds), 1)
    totalOdds = formatToFixed(comboOdds * ODDS_COMBO_FEE_MODIFIER, 2)
  }

  const minOdds = formatToFixed(1 + (totalOdds - 1) * (100 - props.slippage) / 100, 2)

  return minOdds.toFixed(ODDS_DECIMALS)
}
