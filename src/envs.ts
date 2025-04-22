import { gnosis, polygon, polygonAmoy, chiliz, spicy, baseSepolia, base } from 'viem/chains'


export enum Environment {
  GnosisDevXDAI = 'GnosisDevXDAI',
  GnosisXDAI = 'GnosisXDAI',
  PolygonUSDT = 'PolygonUSDT',
  // PolygonAmoyAZUSD = 'PolygonAmoyAZUSD',
  PolygonAmoyUSDT = 'PolygonAmoyUSDT',
  ChilizWCHZ = 'ChilizWCHZ',
  ChilizSpicyWCHZ = 'ChilizSpicyWCHZ',
  BaseWETH = 'BaseWETH',
  BaseSepoliaWETH = 'BaseSepoliaWETH'
}

export const environments = {
  [gnosis.id]: Environment.GnosisXDAI,
  [polygon.id]: Environment.PolygonUSDT,
  [polygonAmoy.id]: Environment.PolygonAmoyUSDT,
  [chiliz.id]: Environment.ChilizWCHZ,
  [spicy.id]: Environment.ChilizSpicyWCHZ,
  [base.id]: Environment.BaseWETH,
  [baseSepolia.id]: Environment.BaseSepoliaWETH,
}
