import { gnosis, polygon, polygonAmoy, chiliz, spicy, baseSepolia, base, bscTestnet, bsc } from 'viem/chains'


export enum Environment {
  GnosisDevXDAI = 'GnosisDevXDAI',
  GnosisXDAI = 'GnosisXDAI',
  PolygonUSDT = 'PolygonUSDT',
  // PolygonAmoyAZUSD = 'PolygonAmoyAZUSD',
  PolygonAmoyUSDT = 'PolygonAmoyUSDT',
  ChilizWCHZ = 'ChilizWCHZ',
  ChilizSpicyWCHZ = 'ChilizSpicyWCHZ',
  BaseWETH = 'BaseWETH',
  BaseSepoliaWETH = 'BaseSepoliaWETH',
  BscDevUSDT = 'BscDevUSDT',
  BscUSDT = 'BscUSDT',
}

export const environments = {
  [gnosis.id]: Environment.GnosisXDAI,
  [polygon.id]: Environment.PolygonUSDT,
  [polygonAmoy.id]: Environment.PolygonAmoyUSDT,
  [chiliz.id]: Environment.ChilizWCHZ,
  [spicy.id]: Environment.ChilizSpicyWCHZ,
  [base.id]: Environment.BaseWETH,
  [baseSepolia.id]: Environment.BaseSepoliaWETH,
  [bscTestnet.id]: Environment.BscDevUSDT,
  [bsc.id]: Environment.BscUSDT,
}
