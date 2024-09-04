import { gnosis, polygon, polygonAmoy, chiliz, spicy } from 'viem/chains'


export enum Environment {
  GnosisDevXDAI = 'GnosisDevXDAI',
  GnosisXDAI = 'GnosisXDAI',
  PolygonUSDT = 'PolygonUSDT',
  PolygonAmoyAZUSD = 'PolygonAmoyAZUSD',
  PolygonAmoyUSDT = 'PolygonAmoyUSDT',
  ChilizWCHZ = 'ChilizWCHZ',
  ChilizSpicyWCHZ = 'ChilizSpicyWCHZ'
}

export const environments = {
  [gnosis.id]: Environment.GnosisXDAI,
  [polygon.id]: Environment.PolygonUSDT,
  [polygonAmoy.id]: Environment.PolygonAmoyAZUSD,
  [chiliz.id]: Environment.ChilizWCHZ,
  [spicy.id]: Environment.ChilizSpicyWCHZ,
} as const

export const environmentsDev = {
  [gnosis.id]: Environment.GnosisDevXDAI,
  [polygonAmoy.id]: Environment.PolygonAmoyUSDT,
  [spicy.id]: Environment.ChilizSpicyWCHZ,
} as const

const envValues = Object.values(Environment)

export const isEnvironmentEnum = (value: any): value is Environment => {
  return envValues.includes(value)
}
