export { environments, Environment } from './envs'
export {
  ODDS_DECIMALS, MARGIN_DECIMALS, MIN_LIVE_BET_AMOUNT, deBridgeUrl, deBridgeTxUrl, liveHostAddress, liveSupportedChains,
  type ChainData, chainsData, chainsDataByEnv, type ChainId,
} from './config'
export * from './global'
export * from './abis'

// docs
export * from './docs'

// utils
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
export { getLiveBetTypedData } from './utils/getLiveBetTypedData'
export { createLiveBet, type CreateLiveBetResponse, LiveBetState } from './utils/createLiveBet'
export { getLiveBet, type GetLiveBetResponse } from './utils/getLiveBet'

// wave
export { getWaveLevels, WaveLevelName, type WaveLevelData, type WaveLevelsResponse } from './utils/wave/getWaveLevels'
export { getWaveStats, type WaveStatsResponse } from './utils/wave/getWaveStats'
export { getWavePeriods, type WavePeriodsResponse } from './utils/wave/getWavePeriods'
export { getWaveLeaderBoard, type WaveLeaderBoardItem } from './utils/wave/getWaveLeaderBoard'
export { activateWave } from './utils/wave/activateWave'

// deBridge
export { createDeBridgeBet, type DeBridgeCreateTxResponse } from './utils/deBridge/createDeBridgeBet'
export { getDeBridgeSupportedChains, deBridgeChainIdByOriginalChainId, type DeBridgeSupportedChains } from './utils/deBridge/getDeBridgeSupportedChains'
export { getDeBridgeSupportedTokens, type DeBridgeSupportedTokens } from './utils/deBridge/getDeBridgeSupportedTokens'
export { getDeBridgeOrder, DeBridgeOrderStatus, DeBridgeExternalCallStatus } from './utils/deBridge/getDeBridgeOrder'
