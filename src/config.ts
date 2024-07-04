import { polygon, gnosis, polygonAmoy, chiliz, spicy, type Chain } from 'viem/chains'
import { type Address } from 'viem'

import { setupContracts, type Contracts } from './utils/setupContracts'
import { getApiEndpoint, getGraphqlLiveEndpoint, getGraphqlPrematchEndpoint, getSocketEndpoint } from './utils/getEndpoints'


export const ODDS_DECIMALS = 12
export const MIN_LIVE_BET_AMOUNT = 1

export const deBridgeUrl = 'https://api.dln.trade/v1.0'
export const deBridgeTxUrl = 'https://stats-api.dln.trade/api'

export const liveHostAddress = '0x67Fca88E2f5F2C33b86bFa4EccfCb8dCD6a56D17'
export const liveSupportedChains: ChainId[] = [ polygon.id, gnosis.id, polygonAmoy.id ]

export enum Environment {
  GnosisXDAI = 'GnosisXDAI',
  PolygonUSDT = 'PolygonUSDT',
  PolygonAmoyAZUSD = 'PolygonAmoyAZUSD',
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

type BetToken = {
  address: Address
  symbol: string
  decimals: number
}

export type ChainData = {
  chain: Omit<Chain, 'id'> & { id: ChainId }
  graphql: {
    prematch: string,
    live: string,
  }
  socket: string
  api: string
  environment: Environment
  contracts: Contracts
  betToken: BetToken
}

const gnosisData: ChainData = {
  chain: gnosis,
  graphql: {
    prematch: getGraphqlPrematchEndpoint('gnosis'),
    live: getGraphqlLiveEndpoint(gnosis.id),
  },
  socket: getSocketEndpoint(gnosis.id),
  api: getApiEndpoint(gnosis.id),
  environment: environments[gnosis.id],
  contracts: setupContracts({
    lp: '0x204e7371Ade792c5C006fb52711c50a7efC843ed',
    prematchCore: '0x7f3F3f19c4e4015fd9Db2f22e653c766154091EF',
    prematchComboCore: '0xDbC3BE2DDB53e1a288F7b7a4d020F8056D3b0F7C',
    proxyFront: '0x3A1c6640daeAc3513726F06A9f03911CC1080251',
    liveRelayer: '0x936c02503A32aA23BCF7CFaF5c29100b0F93FCfe',
    liveCore: '0x0223ff7efca5aec919c471fa2eb44cda466f1500',
  }),
  betToken: {
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    symbol: 'WXDAI',
    decimals: 18,
  },
}

const polygonData: ChainData = {
  chain: polygon,
  graphql: {
    prematch: getGraphqlPrematchEndpoint('polygon'),
    live: getGraphqlLiveEndpoint(polygon.id),
  },
  socket: getSocketEndpoint(polygon.id),
  api: getApiEndpoint(polygon.id),
  environment: environments[polygon.id],
  contracts: setupContracts({
    lp: '0x7043E4e1c4045424858ECBCED80989FeAfC11B36',
    prematchCore: '0xA40F8D69D412b79b49EAbdD5cf1b5706395bfCf7',
    prematchComboCore: '0x92a4e8Bc6B92a2e1ced411f41013B5FE6BE07613',
    proxyFront: '0x0DEE52b98ba8326DaD4C346a4F806Fd871360a00',
    liveRelayer: '0xC6BB817a7f02874F360d135D880200A2E440207D',
    liveCore: '0xc389558Faca41bC747F763cf8616704187CDcD04',
  }),
  betToken: {
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    symbol: 'USDT',
    decimals: 6,
  },
}

const polygonAmoyData: ChainData = {
  chain: polygonAmoy,
  graphql: {
    prematch: getGraphqlPrematchEndpoint('polygon-amoy-preprod'),
    live: getGraphqlLiveEndpoint(polygonAmoy.id),
  },
  socket: getSocketEndpoint(polygonAmoy.id),
  api: getApiEndpoint(polygonAmoy.id),
  environment: environments[polygonAmoy.id],
  contracts: setupContracts({
    lp: '0x3528186476FD0eA0AdC9fCcc41de4CD138f99653',
    prematchCore: '0x2477B960080B3439b4684df3D9CE53B2ACe64315',
    prematchComboCore: '0xdF71998f7931caD24439A12A2F56D7326C3D0295',
    proxyFront: '0x7003CaA0847CA296EBF51C43D9021656a663304f',
    liveRelayer: '0x355B8493380fA5D57E4d3aFBF7C5f38b64AD5eA9',
    liveCore: '0x51eD5C2596d9AE32cE53ac1915Cb9333AFeF3156',
  }),
  betToken: {
    address: '0xf028b2dd00e20a8d9db3964a5feb0633d2ee46cd',
    symbol: 'AZUSD',
    decimals: 6,
  },
}

const chilizData: ChainData = {
  chain: chiliz,
  graphql: {
    prematch: getGraphqlPrematchEndpoint('chiliz'),
    live: getGraphqlLiveEndpoint(chiliz.id),
  },
  socket: getSocketEndpoint(chiliz.id),
  api: getApiEndpoint(chiliz.id),
  environment: environments[chiliz.id],
  contracts: setupContracts({
    lp: '0x6909eAD2a1DA7b632D5993d329DEf4d2dbBc8261',
    prematchCore: '0x1a21C681Cc83889f4b213485aB6cF4971C43114B',
    prematchComboCore: '0x724fa8931428D5B636F7191d3e848f28Ab23C425',
    proxyFront: '0x45779134E5091756601Cb5bA389f9C76b914E520',
  }),
  betToken: {
    address: '0x677F7e16C7Dd57be1D4C8aD1244883214953DC47',
    symbol: 'WCHZ',
    decimals: 18,
  },
}

const spicyData: ChainData = {
  chain: spicy,
  graphql: {
    prematch: getGraphqlPrematchEndpoint('chiliz-spicy-dev'),
    live: getGraphqlLiveEndpoint(spicy.id),
  },
  socket: getSocketEndpoint(spicy.id),
  api: getApiEndpoint(spicy.id),
  environment: environments[spicy.id],
  contracts: setupContracts({
    lp: '0x82f25d2670994b218b8a4C1e5Acc120D6c27d786',
    prematchCore: '0x035AB843C9F6dCB9D9bDeAC18c191dEc6c975fB7',
    prematchComboCore: '0xF94a49F0D78eAfeda81c785131eb6419EB18b33A',
    proxyFront: '0x67f3228fD58f5A26D93a5dd0c6989b69c95618eB',
  }),
  betToken: {
    address: '0x721ef6871f1c4efe730dce047d40d1743b886946',
    symbol: 'WCHZ',
    decimals: 18,
  },
}

export const chainsData = {
  [gnosis.id]: gnosisData,
  [polygon.id]: polygonData,
  [polygonAmoy.id]: polygonAmoyData,
  [chiliz.id]: chilizData,
  [spicy.id]: spicyData,
} as const

export type ChainId = keyof typeof chainsData
