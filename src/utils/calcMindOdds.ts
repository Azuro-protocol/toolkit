import { ODDS_DECIMALS } from '../config'


type Props = {
  odds: number | number[]
  slippage: number
}

export const calcMindOdds = (props: Props) => {
  const totalOdds = typeof props.odds === 'number' ? props.odds : props.odds.reduce((acc, odds) => acc * +odds, 1)
  const minOdds = 1 + (totalOdds - 1) * (100 - props.slippage) / 100

  return minOdds.toFixed(ODDS_DECIMALS)
}
