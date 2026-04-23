import { gnosis, polygon, polygonAmoy, chiliz, spicy, baseSepolia, base, bscTestnet, bsc } from 'viem/chains'


export enum Environment {
  PolygonUSDT = 'PolygonUSDT',
  PolygonAmoyUSDT = 'PolygonAmoyUSDT',
  BaseWETH = 'BaseWETH',
  BaseSepoliaWETH = 'BaseSepoliaWETH',
  /** @deprecated Gnosis is discontinued */
  GnosisDevXDAI = 'GnosisDevXDAI',
  /** @deprecated Gnosis is discontinued */
  GnosisXDAI = 'GnosisXDAI',
  /** @deprecated BSC is discontinued */
  ChilizWCHZ = 'ChilizWCHZ',
  /** @deprecated BSC is discontinued*/
  ChilizSpicyWCHZ = 'ChilizSpicyWCHZ',
  /** @deprecated BSC is discontinued*/
  BscUSDT = 'BscUSDT',
  /** @deprecated BSC is discontinued*/
  BscDevUSDT = 'BscDevUSDT',
}

export const environments = {
  [polygon.id]: Environment.PolygonUSDT,
  [polygonAmoy.id]: Environment.PolygonAmoyUSDT,
  [base.id]: Environment.BaseWETH,
  [baseSepolia.id]: Environment.BaseSepoliaWETH,
  [gnosis.id]: Environment.GnosisXDAI,
  [chiliz.id]: Environment.ChilizWCHZ,
  [spicy.id]: Environment.ChilizSpicyWCHZ,
  [bscTestnet.id]: Environment.BscDevUSDT,
  [bsc.id]: Environment.BscUSDT,
}
