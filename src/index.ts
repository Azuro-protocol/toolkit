export { environments, Environment } from './envs'
export * from './config'
export * from './global'
export * from './abis'

// docs
export * from './docs'

// utils
export { getProviderFromId } from './utils/getProviderFromId'
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

// cashout
export { getPrecalculatedCashouts, type GetPrecalculatedCashouts } from './utils/cashout/getPrecalculatedCashouts'
export { getCalculatedCashout, type GetCalculatedCashout } from './utils/cashout/getCalculatedCashout'
export { getCashoutTypedData } from './utils/cashout/getCashoutTypedData'
export { createCashout, CashoutState, type CreateCashoutResponse } from './utils/cashout/createCashout'
export { getCashout, type GetCashoutResponse } from './utils/cashout/getCashout'

// cashback
export { getCashbackBalance, type GetCashbackBalance } from './utils/cashback/getCashbackBalance'
export { createCashbackTransaction, type CashbackTransaction } from './utils/cashback/createCashbackTransaction'
