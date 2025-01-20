import { gnosis, polygon, polygonAmoy, chiliz, spicy, baseSepolia } from 'viem/chains'


export const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

export enum Environment {
  GnosisDevXDAI = 'GnosisDevXDAI',
  GnosisXDAI = 'GnosisXDAI',
  PolygonUSDT = 'PolygonUSDT',
  PolygonAmoyAZUSD = 'PolygonAmoyAZUSD',
  PolygonAmoyUSDT = 'PolygonAmoyUSDT',
  ChilizWCHZ = 'ChilizWCHZ',
  ChilizSpicyWCHZ = 'ChilizSpicyWCHZ',
  BaseSepoliaWETH = 'BaseSepoliaWETH'
}

export const environments = {
  [gnosis.id]: isDevEnabled ? Environment.GnosisDevXDAI : Environment.GnosisXDAI,
  [polygon.id]: Environment.PolygonUSDT,
  [polygonAmoy.id]: isDevEnabled ? Environment.PolygonAmoyUSDT : Environment.PolygonAmoyAZUSD,
  [chiliz.id]: Environment.ChilizWCHZ,
  [spicy.id]: Environment.ChilizSpicyWCHZ,
  [baseSepolia.id]: Environment.BaseSepoliaWETH,
}
