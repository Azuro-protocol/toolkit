import { polygon, gnosis, polygonAmoy, chiliz, spicy, baseSepolia, base } from 'viem/chains'

import { environments, Environment } from './envs'
import { setupContracts } from './utils/setupContracts'
import { getApiEndpoint, getFeedGraphqlEndpoint, getBetsGraphqlEndpoint, getSocketEndpoint, getLegacyLiveGraphqlEndpoint } from './utils/getEndpoints'
import { type ChainData } from './global'


export const ODDS_DECIMALS = 12
export const MIN_BET_AMOUNT = 1

export const CLIENT_DATA_TYPES = [
  { name: 'attention', type: 'string' },
  { name: 'affiliate', type: 'address' },
  { name: 'core', type: 'address' },
  { name: 'expiresAt', type: 'uint256' },
  { name: 'chainId', type: 'uint256' },
  { name: 'relayerFeeAmount', type: 'uint256' },
  { name: 'isFeeSponsored', type: 'bool' },
  { name: 'isBetSponsored', type: 'bool' },
  { name: 'isSponsoredBetReturnable', type: 'bool' },
] as const

export const BET_DATA_TYPES = {
  ClientBetData: [
    { name: 'clientData', type: 'ClientData' },
    { name: 'bets', type: 'SubBet[]' },
  ],
  ClientData: CLIENT_DATA_TYPES,
  SubBet: [
    { name: 'conditionId', type: 'uint256' },
    { name: 'outcomeId', type: 'uint128' },
    { name: 'minOdds', type: 'uint64' },
    { name: 'amount', type: 'uint128' },
    { name: 'nonce', type: 'uint256' },
  ],
} as const

export const COMBO_BET_DATA_TYPES = {
  ClientComboBetData: [
    { name: 'clientData', type: 'ClientData' },
    { name: 'minOdds', type: 'uint64' },
    { name: 'amount', type: 'uint128' },
    { name: 'nonce', type: 'uint256' },
    { name: 'bets', type: 'ComboPart[]' },
  ],
  ClientData: CLIENT_DATA_TYPES,
  ComboPart: [
    { name: 'conditionId', type: 'uint256' },
    { name: 'outcomeId', type: 'uint128' },
  ],
} as const

export const TYPED_DATA_DOMAIN_NAME = 'Live Betting'
export const TYPED_DATA_DOMAIN_VERSION = '1.0.0'

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

export const gnosisData: ChainData = {
  chain: gnosis,
  graphql: {
    bets: getBetsGraphqlEndpoint(gnosis.id),
    feed: getFeedGraphqlEndpoint(gnosis.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(gnosis.id),
  },
  socket: getSocketEndpoint(gnosis.id),
  api: getApiEndpoint(gnosis.id),
  environment: environments[gnosis.id],
  contracts: setupContracts({
    lp: '0xeb7cDA87D00d677A6Dc73EB569723b0fA51D97E7',
    core: '0x0e00E6ffcb5E207B800eec9e02999D1Fd9e448f2',
    relayer: '0x40eb85018fA18dDd10a433C8c40ca8D6744d8B32',
    azuroBet: '0xd7cd9342A14962C2dCB14569CB6fcA2759999089',
    cashout: '0x25de227af58188e656524d1C32cCf7C078cdC891',
  }),
  betToken: {
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    symbol: 'WXDAI',
    decimals: 18,
  },
}

export const gnosisDevData: ChainData = {
  chain: gnosis,
  graphql: {
    bets: getBetsGraphqlEndpoint(gnosis.id),
    feed: getFeedGraphqlEndpoint(gnosis.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(gnosis.id),
  },
  socket: getSocketEndpoint(gnosis.id),
  api: getApiEndpoint(gnosis.id),
  environment: environments[gnosis.id],
  contracts: setupContracts({
    lp: '0x0C2F50DCE97a4e327f5580bA4aad4E48d27f6DbD',
    core: '0x12d5E6d2e9c47015C26a7c959a5Db42E3eF5a1Ef',
    relayer: '0x7C9C7B37C93EbC2103061834eb2781809f604eAf',
    azuroBet: '0x9407B57bF56292b0d9940Ed69D9a74ACffb11413',
    cashout: '0xF8E7F2e4693DBEd186b302474EeE5AE4Ab2E0150',
  }),
  betToken: {
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    symbol: 'WXDAI',
    decimals: 18,
  },
}

export const polygonData: ChainData = {
  chain: polygon,
  graphql: {
    bets: getBetsGraphqlEndpoint(polygon.id),
    feed: getFeedGraphqlEndpoint(polygon.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(polygon.id),
  },
  socket: getSocketEndpoint(polygon.id),
  api: getApiEndpoint(polygon.id),
  environment: environments[polygon.id],
  contracts: setupContracts({
    lp: '0x0FA7FB5407eA971694652E6E16C12A52625DE1b8',
    core: '0xF9548Be470A4e130c90ceA8b179FCD66D2972AC7',
    relayer: '0x8dA05c0021e6b35865FDC959c54dCeF3A4AbBa9d',
    azuroBet: '0x7A1c3FEf712753374C4DCe34254B96faF2B7265B',
    cashout: '0x4a2BB4211cCF9b9eA6eF01D0a61448154ED19095',
  }),
  betToken: {
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    symbol: 'USDT',
    decimals: 6,
  },
}

// const polygonAmoyData: ChainData = {
//   chain: polygonAmoy,
//   graphql: {
//     bets: getBetsGraphqlEndpoint(polygonAmoy.id),
//     feed: getFeedGraphqlEndpoint(polygonAmoy.id),
//     legacyLive: getLegacyLiveGraphqlEndpoint(polygonAmoy.id),
//   },
//   socket: getSocketEndpoint(polygonAmoy.id),
//   api: getApiEndpoint(polygonAmoy.id),
//   environment: environments[polygonAmoy.id],
//   contracts: setupContracts({
//     lp: '0x3528186476FD0eA0AdC9fCcc41de4CD138f99653',
//     core: '0x2477B960080B3439b4684df3D9CE53B2ACe64315',
//     relayer: '0x355B8493380fA5D57E4d3aFBF7C5f38b64AD5eA9',
//     azuroBet: '0x5E59ee1b09Cb2Cf031e4Beaa8dB48D4B8b7e38AD',
//     cashout: '0x080d71059891Fb4d722855df28bFB208335F1587',
//   }),
//   betToken: {
//     address: '0xf028b2dd00e20a8d9db3964a5feb0633d2ee46cd',
//     symbol: 'AZUSD',
//     decimals: 6,
//   },
// }

export const polygonAmoyData: ChainData = {
  chain: polygonAmoy,
  graphql: {
    bets: getBetsGraphqlEndpoint(polygonAmoy.id),
    feed: getFeedGraphqlEndpoint(polygonAmoy.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(polygonAmoy.id),
  },
  socket: getSocketEndpoint(polygonAmoy.id),
  api: getApiEndpoint(polygonAmoy.id),
  environment: environments[polygonAmoy.id],
  contracts: setupContracts({
    lp: '0x0a75395Ff15d9557424b632cEBCac448D66F9779',
    core: '0xCD0Db5ef28C3Bd3a69283372dE923Eb4DA0585F6',
    relayer: '0x48c9bE88706F22838070eE7C4bC74Ad7A8eeF114',
    azuroBet: '0x4B75c071dFA5d537979E8b0615Bb97B6337dbFef',
    cashout: '0x7dF132Ad2334a667A004049a75a4a8a530dc24F2',
  }),
  betToken: {
    address: '0xCf1b86ceD971b88C042C64A9c099377e2738073C',
    symbol: 'USDT',
    decimals: 6,
  },
}

export const chilizData: ChainData = {
  chain: chiliz,
  graphql: {
    bets: getBetsGraphqlEndpoint(chiliz.id),
    feed: getFeedGraphqlEndpoint(chiliz.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(chiliz.id),
  },
  socket: getSocketEndpoint(chiliz.id),
  api: getApiEndpoint(chiliz.id),
  environment: environments[chiliz.id],
  contracts: setupContracts({
    lp: '0xEf6b12580301b04CD2551182C88623524B6e47b8',
    core: '0xa5061617Ee6565CF48d7f0FEF06910b9fb9dE2b0',
    relayer: '0x81F72B93ABaf061535aaF5D831F05e0CC4084b32',
    azuroBet: '0x3777B4F27F4B36f14454dbB1f79278bcba694B52',
    cashout: '0x3995eebB51793Ee353162E7400DB455B17dE3692',
  }),
  betToken: {
    address: '0x677F7e16C7Dd57be1D4C8aD1244883214953DC47',
    symbol: 'WCHZ',
    decimals: 18,
  },
}

export const spicyData: ChainData = {
  chain: spicy,
  graphql: {
    bets: getBetsGraphqlEndpoint(spicy.id),
    feed: getFeedGraphqlEndpoint(spicy.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(spicy.id),
  },
  socket: getSocketEndpoint(spicy.id),
  api: getApiEndpoint(spicy.id),
  environment: environments[spicy.id],
  contracts: setupContracts({
    lp: '0x431A0993d29eEb0fF7e3FE351A303eF72195431a',
    core: '0x524994dcA5EA2bc979ac5506E7195F28B4c16932',
    relayer: '0x725ec0A9eC9dC993A86d0eFD7fD78929d226AbE7',
    azuroBet: '0xF7815889e5d0635A31eca34390b25d8D2cEeD902',
    cashout: '0x7c771a200EcD61A01af992360303f7b1465Cd8e3',
  }),
  betToken: {
    address: '0x721EF6871f1c4Efe730Dce047D40D1743B886946',
    symbol: 'WCHZ',
    decimals: 18,
  },
}

export const baseSepoliaData: ChainData = {
  chain: baseSepolia,
  graphql: {
    bets: getBetsGraphqlEndpoint(baseSepolia.id),
    feed: getFeedGraphqlEndpoint(baseSepolia.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(baseSepolia.id),
  },
  socket: getSocketEndpoint(baseSepolia.id),
  api: getApiEndpoint(baseSepolia.id),
  environment: environments[baseSepolia.id],
  contracts: setupContracts({
    lp: '0x4fE86EddCC22dc992b7994878169201Ec7ea50AB',
    core: '0x679CC42F69F98631668348d088086359D4217Ffa',
    relayer: '0x2De54cABa6A8198D9Dc51931485Bfdc8017aB0c5',
    azuroBet: '0xD031C4BDd4b7c30e3725132109786B8E158A4c07',
    cashout: '0xf52Eb6ec19d81Ea623A7d7Ad397287C0C40f2F37',
  }),
  betToken: {
    address: '0x9e09f213Ff75e53D52e9e777A6567A68683E935f',
    symbol: 'WETH',
    decimals: 18,
  },
}

export const baseData: ChainData = {
  chain: base,
  graphql: {
    bets: getBetsGraphqlEndpoint(base.id),
    feed: getFeedGraphqlEndpoint(base.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(base.id),
  },
  socket: getSocketEndpoint(base.id),
  api: getApiEndpoint(base.id),
  environment: environments[base.id],
  contracts: setupContracts({
    lp: '0x1eD7368bc515E928A4007cEa61FB8a6F8863Af87',
    core: '0xF40cF1dD7d16C098cff5F8B5650A8FaEf1F4640d',
    relayer: '0xD2D508d66dB4fCE4B384e4C3EA2fa53BA43e73b5',
    azuroBet: '0xF328404Dbc8c997d12dC55a1A179AF7F8cb7df90',
    cashout: '0x6EDff24761F4473611B45BDAe4a779ff31af14Be',
  }),
  betToken: {
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH',
    decimals: 18,
  },
}

export const chainsData = {
  [gnosis.id]: gnosisData,
  [polygon.id]: polygonData,
  [polygonAmoy.id]: polygonAmoyData,
  [chiliz.id]: chilizData,
  [spicy.id]: spicyData,
  [base.id]: baseData,
  [baseSepolia.id]: baseSepoliaData,
}

// if (isDevEnabled) {
//   chainsData[gnosis.id] = gnosisDevData
//   chainsData[polygonAmoy.id] = polygonAmoyDevData
// }

export const chainsDataByEnv: Record<Environment, ChainData> = {
  [Environment.GnosisXDAI]: gnosisData,
  [Environment.GnosisDevXDAI]: gnosisDevData,
  [Environment.PolygonUSDT]: polygonData,
  // [Environment.PolygonAmoyAZUSD]: polygonAmoyData,
  [Environment.PolygonAmoyUSDT]: polygonAmoyData,
  [Environment.ChilizWCHZ]: chilizData,
  [Environment.ChilizSpicyWCHZ]: spicyData,
  [Environment.BaseWETH]: baseData,
  [Environment.BaseSepoliaWETH]: baseSepoliaData,
} as const

export type ChainId = keyof typeof chainsData
