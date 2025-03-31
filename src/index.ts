export { environments, Environment } from './envs'
export * from './config'
export * from './global'
export * from './abis'

// docs
export * from './docs'

// utils
export { getProviderFromId } from './utils/getProviderFromId'
export { calcMindOdds } from './utils/calcMindOdds'
export { getIsPendingResolution } from './utils/getIsPendingResolution'
export { getBetStatus, BetStatus } from './utils/getBetStatus'
export { getBetFee, type BetFeeResponse } from './utils/getBetFee'
export { getPrematchBetDataBytes } from './utils/getPrematchBetDataBytes'
export { groupConditionsByMarket, type GameMarkets, type MarketOutcome, type Market } from './utils/groupConditionsByMarket'
export { groupByConditionId } from './utils/groupByConditionId'
export { setupContracts, type Contracts } from './utils/setupContracts'
export { getApiEndpoint, getPrematchGraphqlEndpoint, getSocketEndpoint } from './utils/getEndpoints'
export { getFreeBets, FreeBetStatus, type FreeBet } from './utils/getFreebets'
export { getBetTypedData } from './utils/getBetTypedData'
export { getComboBetTypedData } from './utils/getComboBetTypedData'
export { createBet } from './utils/createBet'
export { createComboBet } from './utils/createComboBet'
export { getBet, type GetBetResponse } from './utils/getBet'


// wave
export { getWaveLevels, WaveLevelName, type WaveLevelData, type WaveLevelsResponse } from './utils/wave/getWaveLevels'
export { getWaveStats, type WaveStatsResponse } from './utils/wave/getWaveStats'
export { getWavePeriods, type WavePeriodsResponse } from './utils/wave/getWavePeriods'
export { getWaveLeaderBoard, type WaveLeaderBoardItem } from './utils/wave/getWaveLeaderBoard'
export { activateWave } from './utils/wave/activateWave'

// cashout
export { getPrecalculatedCashouts, type GetPrecalculatedCashouts } from './utils/cashout/getPrecalculatedCashouts'
export { getCalculatedCashout, type GetCalculatedCashout } from './utils/cashout/getCalculatedCashout'
export { getCashoutTypedData } from './utils/cashout/getCashoutTypedData'
export { createCashout, CashoutState, type CreateCashoutResponse } from './utils/cashout/createCashout'
export { getCashout, type GetCashoutResponse } from './utils/cashout/getCashout'
