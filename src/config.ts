import { polygon, gnosis, polygonAmoy, chiliz, spicy, baseSepolia, base } from 'viem/chains'

import { isDevEnabled, environments, Environment } from './envs'
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

const gnosisData: ChainData = {
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
    lp: '0x204e7371Ade792c5C006fb52711c50a7efC843ed',
    core: '0x7f3F3f19c4e4015fd9Db2f22e653c766154091EF',
    relayer: '0x936c02503A32aA23BCF7CFaF5c29100b0F93FCfe',
    azuroBet: '0xA3A1B460c68dc91c5B3f71f5487A76fac42858bf',
    cashout: '0x7145e4690A8846d5457D7352625e26b6A605a5AF',
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
    bets: getBetsGraphqlEndpoint(gnosis.id),
    feed: getFeedGraphqlEndpoint(gnosis.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(gnosis.id),
  },
  socket: getSocketEndpoint(gnosis.id),
  api: getApiEndpoint(gnosis.id),
  environment: environments[gnosis.id],
  contracts: setupContracts({
    lp: '0xe068Bf88317fA2eb3EAEcBfe1e486d8b2dDe7761',
    core: '0x0eaa5283990af9ca915b1d82261663d25d039d03',
    relayer: '0x3B0213eB35735A8E2b19F13C5Ec0a65a8226D5B2',
    azuroBet: '0x9AEb928E13b989d5F013b33c14853d8a944Acbf1',
    cashout: '0x483779Ff0F54Be733F513c14AA3a8382AB1cE019',
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
    bets: getBetsGraphqlEndpoint(polygon.id),
    feed: getFeedGraphqlEndpoint(polygon.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(polygon.id),
  },
  socket: getSocketEndpoint(polygon.id),
  api: getApiEndpoint(polygon.id),
  environment: environments[polygon.id],
  contracts: setupContracts({
    lp: '0x7043E4e1c4045424858ECBCED80989FeAfC11B36',
    core: '0xA40F8D69D412b79b49EAbdD5cf1b5706395bfCf7',
    relayer: '0xC6BB817a7f02874F360d135D880200A2E440207D',
    azuroBet: '0x8ed7296b5CAe379d07C70280Af622BC410F01Ed7',
    cashout: '0x365f97EE637f7a9260838F7d2a3601EA800627bE',
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
    bets: getBetsGraphqlEndpoint(polygonAmoy.id),
    feed: getFeedGraphqlEndpoint(polygonAmoy.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(polygonAmoy.id),
  },
  socket: getSocketEndpoint(polygonAmoy.id),
  api: getApiEndpoint(polygonAmoy.id),
  environment: environments[polygonAmoy.id],
  contracts: setupContracts({
    lp: '0x3528186476FD0eA0AdC9fCcc41de4CD138f99653',
    core: '0x2477B960080B3439b4684df3D9CE53B2ACe64315',
    relayer: '0x355B8493380fA5D57E4d3aFBF7C5f38b64AD5eA9',
    azuroBet: '0x5E59ee1b09Cb2Cf031e4Beaa8dB48D4B8b7e38AD',
    cashout: '0x080d71059891Fb4d722855df28bFB208335F1587',
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
    bets: getBetsGraphqlEndpoint(polygonAmoy.id),
    feed: getFeedGraphqlEndpoint(polygonAmoy.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(polygonAmoy.id),
  },
  socket: getSocketEndpoint(polygonAmoy.id),
  api: getApiEndpoint(polygonAmoy.id),
  environment: environments[polygonAmoy.id],
  contracts: setupContracts({
    lp: '0x79A8d0e954A1275DFe6A2a8acDD136718B54cA16',
    core: '0xe6AA5BAE8a4fFe65dD60a1868C1044Cb05d55195',
    relayer: '0x40cff79D064DA1723F838B2Aaad2cfE1ba5b2812',
    azuroBet: '0x8583942bEFd6dc0166Dfb0b9fd680457e01A94Ca',
    cashout: '0x43Ec9E387dC3f11CEAF9a428BD8c1Df47823ce7C',
  }),
  betToken: {
    address: '0xCf1b86ceD971b88C042C64A9c099377e2738073C',
    symbol: 'USDT',
    decimals: 6,
  },
}

const chilizData: ChainData = {
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
    lp: '0x6909eAD2a1DA7b632D5993d329DEf4d2dbBc8261',
    core: '0x1a21C681Cc83889f4b213485aB6cF4971C43114B',
    relayer: '0xA95D8Bd97F567380Bdc068462b9da547af37dAfD',
    azuroBet: '0x8609D1c8610D7F24d826FB76ea878d240537A8B8',
    cashout: '0xAE0830d7588aB44e5D4443168a8D666B54F385FE',
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
    bets: getBetsGraphqlEndpoint(spicy.id),
    feed: getFeedGraphqlEndpoint(spicy.id),
    legacyLive: getLegacyLiveGraphqlEndpoint(spicy.id),
  },
  socket: getSocketEndpoint(spicy.id),
  api: getApiEndpoint(spicy.id),
  environment: environments[spicy.id],
  contracts: setupContracts({
    lp: '0x82f25d2670994b218b8a4C1e5Acc120D6c27d786',
    core: '0x035AB843C9F6dCB9D9bDeAC18c191dEc6c975fB7',
    relayer: '0x699A817E9414698Afc761dCBA83d158894EA7dd4',
    azuroBet: '0x6FA69dD52B5BF761030d3201B1DbE04039bF0BDe',
    cashout: '0xB1E54209e224218A03BFd89f830cCE0414a1921E',
  }),
  betToken: {
    address: '0x721ef6871f1c4efe730dce047d40d1743b886946',
    symbol: 'WCHZ',
    decimals: 18,
  },
}

const baseSepoliaData: ChainData = {
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
    lp: '0xCf6a6e4A8b24a109111143567e3d2Ae4e77c4192',
    core: '0xfa275EAabeFE2B06Fd868A0A88302feF3bB55D5C',
    relayer: '0x2a91Ea47763bB59280823286A94a600D429c0EA0',
    azuroBet: '0x8c1ca2bBe98575c9431a937ad48d1C261754Ab99',
    cashout: '0xc73c85898adBf3c9BD50D77Ee6BBF4F132554fFC',
  }),
  betToken: {
    address: '0x9e09f213Ff75e53D52e9e777A6567A68683E935f',
    symbol: 'WETH',
    decimals: 18,
  },
}

const baseData: ChainData = {
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
    lp: '0xF22E9e29728d6592eB54b916Ba9f464d9F237dB1',
    core: '0xf5A6B7940cbdb80F294f1eAc59575562966aa3FC',
    relayer: '0x4731Bb0D12c4f992Cf02BDc7A48e8656d0E382Ed',
    azuroBet: '0x9Ce099D680401763f9Cb160c8eAc3E5f8307314e',
    cashout: '0xFffF9220288787B24276135E58C0BF68D803F0ad',
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
  [Environment.BaseWETH]: baseData,
  [Environment.BaseSepoliaWETH]: baseSepoliaData,
} as const

export type ChainId = keyof typeof chainsData
