import { polygon, gnosis, polygonAmoy, chiliz, spicy } from 'viem/chains'

import { isDevEnabled, environments, Environment } from './envs'
import { setupContracts } from './utils/setupContracts'
import { getApiEndpoint, getLiveGraphqlEndpoint, getPrematchGraphqlEndpoint, getSocketEndpoint } from './utils/getEndpoints'
import { type ChainData } from './global'


export const ODDS_DECIMALS = 12
export const MARGIN_DECIMALS = 12
export const MIN_LIVE_BET_AMOUNT = 1

export const LIVE_BET_DATA_TYPES = {
  ClientBetData: [
    { name: 'attention', type: 'string' },
    { name: 'affiliate', type: 'address' },
    { name: 'core', type: 'address' },
    { name: 'amount', type: 'uint128' },
    { name: 'nonce', type: 'uint256' },
    { name: 'conditionId', type: 'uint256' },
    { name: 'outcomeId', type: 'uint64' },
    { name: 'minOdds', type: 'uint64' },
    { name: 'expiresAt', type: 'uint256' },
    { name: 'chainId', type: 'uint256' },
    { name: 'relayerFeeAmount', type: 'uint256' },
  ],
} as const

export const LIVE_TYPED_DATA_DOMAIN_NAME = 'Live Betting'
export const LIVE_TYPED_DATA_DOMAIN_VERSION = '1.0.0'

export const CASHOUT_DATA_TYPES = {
  CashOutItem: [
    { name: 'betId', type: 'uint256' },
    { name: 'bettingContract', type: 'address' },
    { name: 'minOdds', type: 'uint64' },
  ],
  CashOutOrder: [
    { name: 'attention', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'items', type: 'CashOutItem[]' },
    { name: 'expiresAt', type: 'uint64' },
  ],
} as const
export const CASHOUT_TYPED_DATA_DOMAIN_NAME = 'Cash Out'
export const CASHOUT_TYPED_DATA_DOMAIN_VERSION = '1.0.0'

export const deBridgeUrl = 'https://api.dln.trade/v1.0'
export const deBridgeTxUrl = 'https://stats-api.dln.trade/api'

export const liveHostAddress = '0x67Fca88E2f5F2C33b86bFa4EccfCb8dCD6a56D17'
export const liveSupportedChains: ChainId[] = [ polygon.id, gnosis.id, polygonAmoy.id ]

const gnosisData: ChainData = {
  chain: gnosis,
  graphql: {
    prematch: getPrematchGraphqlEndpoint(gnosis.id),
    live: getLiveGraphqlEndpoint(gnosis.id),
  },
  socket: getSocketEndpoint(gnosis.id),
  api: getApiEndpoint(gnosis.id),
  environment: environments[gnosis.id],
  contracts: setupContracts({
    lp: '0x204e7371Ade792c5C006fb52711c50a7efC843ed',
    prematchCore: '0x7f3F3f19c4e4015fd9Db2f22e653c766154091EF',
    prematchComboCore: '0xDbC3BE2DDB53e1a288F7b7a4d020F8056D3b0F7C',
    proxyFront: '0x3A1c6640daeAc3513726F06A9f03911CC1080251',
    azuroBet: '0xA3A1B460c68dc91c5B3f71f5487A76fac42858bf',
    liveRelayer: '0x936c02503A32aA23BCF7CFaF5c29100b0F93FCfe',
    liveCore: '0x0223ff7efca5aec919c471fa2eb44cda466f1500',
  }),
  betToken: {
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    symbol: 'WXDAI',
    decimals: 18,
  },
}

const gnosisDevData: ChainData = {
  chain: gnosis,
  graphql: {
    prematch: getPrematchGraphqlEndpoint(gnosis.id),
    live: getLiveGraphqlEndpoint(gnosis.id),
  },
  socket: getSocketEndpoint(gnosis.id),
  api: getApiEndpoint(gnosis.id),
  environment: environments[gnosis.id],
  contracts: setupContracts({
    lp: '0xe068Bf88317fA2eb3EAEcBfe1e486d8b2dDe7761',
    prematchCore: '0x0eaa5283990af9ca915b1d82261663d25d039d03',
    prematchComboCore: '0xdab6c085e2a24d3417875ea154c1d0abb5d427f9',
    proxyFront: '0xB02205C9e5DdFFa3EEa2731fE76e505B0d3eCCb0',
    azuroBet: '0x9AEb928E13b989d5F013b33c14853d8a944Acbf1',
    cashout: '0x483779Ff0F54Be733F513c14AA3a8382AB1cE019',
    liveRelayer: '0x3B0213eB35735A8E2b19F13C5Ec0a65a8226D5B2',
    liveCore: '0xFc4910f0E7523063f3640e249Fc0f25542b76899',
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
    prematch: getPrematchGraphqlEndpoint(polygon.id),
    live: getLiveGraphqlEndpoint(polygon.id),
  },
  socket: getSocketEndpoint(polygon.id),
  api: getApiEndpoint(polygon.id),
  environment: environments[polygon.id],
  contracts: setupContracts({
    lp: '0x7043E4e1c4045424858ECBCED80989FeAfC11B36',
    prematchCore: '0xA40F8D69D412b79b49EAbdD5cf1b5706395bfCf7',
    prematchComboCore: '0x92a4e8Bc6B92a2e1ced411f41013B5FE6BE07613',
    proxyFront: '0x0DEE52b98ba8326DaD4C346a4F806Fd871360a00',
    azuroBet: '0x8ed7296b5CAe379d07C70280Af622BC410F01Ed7',
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
    prematch: getPrematchGraphqlEndpoint(polygonAmoy.id),
    live: getLiveGraphqlEndpoint(polygonAmoy.id),
  },
  socket: getSocketEndpoint(polygonAmoy.id),
  api: getApiEndpoint(polygonAmoy.id),
  environment: environments[polygonAmoy.id],
  contracts: setupContracts({
    lp: '0x3528186476FD0eA0AdC9fCcc41de4CD138f99653',
    prematchCore: '0x2477B960080B3439b4684df3D9CE53B2ACe64315',
    prematchComboCore: '0xdF71998f7931caD24439A12A2F56D7326C3D0295',
    proxyFront: '0x7003CaA0847CA296EBF51C43D9021656a663304f',
    azuroBet: '0x5E59ee1b09Cb2Cf031e4Beaa8dB48D4B8b7e38AD',
    liveRelayer: '0x355B8493380fA5D57E4d3aFBF7C5f38b64AD5eA9',
    liveCore: '0x51eD5C2596d9AE32cE53ac1915Cb9333AFeF3156',
  }),
  betToken: {
    address: '0xf028b2dd00e20a8d9db3964a5feb0633d2ee46cd',
    symbol: 'AZUSD',
    decimals: 6,
  },
}

const polygonAmoyDevData: ChainData = {
  chain: polygonAmoy,
  graphql: {
    prematch: getPrematchGraphqlEndpoint(polygonAmoy.id),
    live: getLiveGraphqlEndpoint(polygonAmoy.id),
  },
  socket: getSocketEndpoint(polygonAmoy.id),
  api: getApiEndpoint(polygonAmoy.id),
  environment: environments[polygonAmoy.id],
  contracts: setupContracts({
    lp: '0xDAa095204aCc244020F8f8e915f36533150ACF4b',
    prematchCore: '0x87EBFFe283bE8dEd47c3C87451d1B89c8a2C441A',
    prematchComboCore: '0x471DaC1052248602fdF05377EF99B5b7b3a769a1',
    proxyFront: '0x7003CaA0847CA296EBF51C43D9021656a663304f',
    azuroBet: '0x68af5E36EF6474036604702B33014D3b4dcc93f2',
    cashout: '0x914669F2BE69b1FE2a4927E9C84d1F0b4E933Ab6',
    liveRelayer: '0x38633e7Cbd86959453445C170168855ed1151C22',
    liveCore: '0x00232f2dEEae4541da1C5eC265193C879B2304Eb',
  }),
  betToken: {
    address: '0x683026Eb1b912795E4Eb1e73Da7e38C3F2f830c4',
    symbol: 'USDT',
    decimals: 6,
  },
}

const chilizData: ChainData = {
  chain: chiliz,
  graphql: {
    prematch: getPrematchGraphqlEndpoint(chiliz.id),
    live: getLiveGraphqlEndpoint(chiliz.id),
  },
  socket: getSocketEndpoint(chiliz.id),
  api: getApiEndpoint(chiliz.id),
  environment: environments[chiliz.id],
  contracts: setupContracts({
    lp: '0x6909eAD2a1DA7b632D5993d329DEf4d2dbBc8261',
    prematchCore: '0x1a21C681Cc83889f4b213485aB6cF4971C43114B',
    prematchComboCore: '0x724fa8931428D5B636F7191d3e848f28Ab23C425',
    proxyFront: '0x45779134E5091756601Cb5bA389f9C76b914E520',
    azuroBet: '0x8609D1c8610D7F24d826FB76ea878d240537A8B8',
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
    prematch: getPrematchGraphqlEndpoint(spicy.id),
    live: getLiveGraphqlEndpoint(spicy.id),
  },
  socket: getSocketEndpoint(spicy.id),
  api: getApiEndpoint(spicy.id),
  environment: environments[spicy.id],
  contracts: setupContracts({
    lp: '0x82f25d2670994b218b8a4C1e5Acc120D6c27d786',
    prematchCore: '0x035AB843C9F6dCB9D9bDeAC18c191dEc6c975fB7',
    prematchComboCore: '0xF94a49F0D78eAfeda81c785131eb6419EB18b33A',
    proxyFront: '0x67f3228fD58f5A26D93a5dd0c6989b69c95618eB',
    azuroBet: '0x6FA69dD52B5BF761030d3201B1DbE04039bF0BDe',
    cashout: '0xB1E54209e224218A03BFd89f830cCE0414a1921E',
    liveRelayer: '0x699A817E9414698Afc761dCBA83d158894EA7dd4',
    liveCore: '0xC6B38c80427E4038e91798847b5C5b056C358817',
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
}

if (isDevEnabled) {
  chainsData[gnosis.id] = gnosisDevData
  chainsData[polygonAmoy.id] = polygonAmoyDevData
}

export const chainsDataByEnv: Record<Environment, ChainData> = {
  [Environment.GnosisXDAI]: gnosisData,
  [Environment.GnosisDevXDAI]: gnosisDevData,
  [Environment.PolygonUSDT]: polygonData,
  [Environment.PolygonAmoyAZUSD]: polygonAmoyData,
  [Environment.PolygonAmoyUSDT]: polygonAmoyDevData,
  [Environment.ChilizWCHZ]: chilizData,
  [Environment.ChilizSpicyWCHZ]: spicyData,
} as const

export type ChainId = keyof typeof chainsData
