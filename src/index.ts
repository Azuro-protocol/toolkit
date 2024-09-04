export {
  ODDS_DECIMALS, MIN_LIVE_BET_AMOUNT, deBridgeUrl, deBridgeTxUrl, liveHostAddress, liveSupportedChains,
  type ChainData, chainsData, chainsDataByEnv, type ChainId,
} from './config'
export * from './global'
export * from './abis'

// docs
export * from './docs'

// utils
export { Environment, environments, environmentsDev } from './utils/envs'
export { calcMindOdds } from './utils/calcMindOdds'
export { calcLiveOdds, calcPrematchOdds } from './utils/calcOdds'
export { getGameStatus, GameStatus } from './utils/getGameStatus'
export { getBetStatus, BetStatus } from './utils/getBetStatus'
export { getLiveBetFee, type LiveBetFeeResponse } from './utils/getLiveBetFee'
export { getPrematchBetDataBytes } from './utils/getPrematchBetDataBytes'
export { groupConditionsByMarket, type GameMarkets, type MarketOutcome, type Market } from './utils/groupConditionsByMarket'
export { groupByConditionId } from './utils/groupByConditionId'
export { setupContracts, type Contracts } from './utils/setupContracts'
export { getApiEndpoint, getLiveGraphqlEndpoint, getPrematchGraphqlEndpoint, getSocketEndpoint } from './utils/getEndpoints'
export { getFreeBets, FreeBetStatus, type FreeBet } from './utils/getFreebets'

// wave
export { getWaveLevels, WaveLevelName, type WaveLevelData, type WaveLevelsResponse } from './utils/wave/getWaveLevels'
export { getWaveStats, type WaveStatsResponse } from './utils/wave/getWaveStats'
export { getWavePeriods, type WavePeriodsResponse } from './utils/wave/getWavePeriods'
export { getWaveLeaderBoard, type WaveLeaderBoardItem } from './utils/wave/getWaveLeaderBoard'
export { activateWave } from './utils/wave/activateWave'

// deBridge
export { createDeBridgeBet, type DeBridgeCreateTxResponse } from './utils/deBridge/createDeBridgeBet'
export { getDeBridgeSupportedChains } from './utils/deBridge/getDeBridgeSupportedChains'
export { getDeBridgeSupportedTokens } from './utils/deBridge/getDeBridgeSupportedTokens'
export { getDeBridgeOrder, DeBridgeOrderStatus, DeBridgeExternalCallStatus } from './utils/deBridge/getDeBridgeOrder'
