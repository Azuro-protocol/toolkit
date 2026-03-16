export { environments, Environment } from './envs'
export * from './config'
export * from './global'
export * from './abis'
export * from './docs'

// utils
export { getProviderFromId } from './utils/getProviderFromId'
export { calcMinOdds, type CalcMinOddsParams } from './utils/calcMinOdds'
export { getIsPendingResolution, type GetIsPendingResolutionParams } from './utils/getIsPendingResolution'
export { groupConditionsByMarket, type GameMarkets, type MarketOutcome, type Market } from './utils/groupConditionsByMarket'
export { setupContracts, type Contracts } from './utils/setupContracts'
export { getFeedGraphqlEndpoint, getBetsGraphqlEndpoint, getApiEndpoint, getSocketEndpoint } from './utils/getEndpoints'

// bet
export { getBetStatus, BetStatus } from './utils/bet/getBetStatus'
export { getBetFee, type GetBetFeeParams, type GetBetFeeResult, type BetFeeResponse } from './utils/bet/getBetFee'
export { getBetTypedData, type GetBetTypedDataParams } from './utils/bet/getBetTypedData'
export { getComboBetTypedData, type GetComboBetTypedDataParams } from './utils/bet/getComboBetTypedData'
export { createBet, type CreateBetParams, type CreateBetResult } from './utils/bet/createBet'
export { createComboBet, type CreateComboBetParams, type CreateComboBetResult } from './utils/bet/createComboBet'
export { getBet, type GetBetParams, type GetBetResponse, type GetBetResult } from './utils/bet/getBet'
export { getBetCalculation, type GetBetCalculationParams, type GetBetCalculationResult } from './utils/bet/getBetCalculation'
export { getBetsByBettor, type GetBetsByBettorParams, type GetBetsByBettorResult } from './utils/bet/getBetsByBettor'
export { type BetOrderData, type BetOrderConditionData, type BetMetaData } from './utils/bet/types'

// feed
export { getConditionsByGameIds, type GetConditionsByGameIdsParams, type GetConditionsByGameIdsResponseResult, type ConditionDetailedData } from './utils/feed/getConditionsByGameIds'
export { getConditionsState, type GetConditionsStateParams, type GetConditionsStateResult, type ConditionStateData } from './utils/feed/getConditionsState'
export { getGamesByFilters, type GetGamesByFiltersParams, type GetGamesByFiltersResult } from './utils/feed/getGamesByFilters'
export { getGamesByIds, type GetGamesByIdsParams, type GetGamesByIdsResult } from './utils/feed/getGamesByIds'
export { getNavigation, type GetNavigationParams, type GetNavigationResult, type NavigationSportData } from './utils/feed/getNavigation'
export { getSports, type GetSportsParams, type GetSportsResult, type SportData } from './utils/feed/getSports'
export { searchGames, type SearchGamesParams, type SearchGamesResult } from './utils/feed/searchGames'
export { type GameData, type PaginatedGamesResponse, type GameParticipant, GameOrderBy } from './utils/feed/types'

// wave
export { getWaveLevels, WaveLevelName, type WaveLevelData, type WaveLevelsResponse } from './utils/wave/getWaveLevels'
export { getWaveStats, type WaveStatsResponse } from './utils/wave/getWaveStats'
export { getWavePeriods, type WavePeriodsResponse } from './utils/wave/getWavePeriods'
export { getWaveLeaderBoard, type WaveLeaderBoardItem } from './utils/wave/getWaveLeaderBoard'
export { activateWave } from './utils/wave/activateWave'

// cashout
export { getPrecalculatedCashouts, type GetPrecalculatedCashoutsParams, type GetPrecalculatedCashoutsResult, type GetPrecalculatedCashouts } from './utils/cashout/getPrecalculatedCashouts'
export { getCalculatedCashout, type GetCalculatedCashoutParams, type GetCalculatedCashoutResult, type GetCalculatedCashout } from './utils/cashout/getCalculatedCashout'
export { getCashoutTypedData, type GetCashoutTypedDataParams } from './utils/cashout/getCashoutTypedData'
export { createCashout, CashoutState, type CreateCashoutParams, type CreateCashoutResult, type CreateCashoutResponse } from './utils/cashout/createCashout'
export { getCashout, type GetCashoutParams, type GetCashoutResult, type GetCashoutResponse } from './utils/cashout/getCashout'

// bonus
export { getBonuses, type GetBonusesParams, type GetBonusesResult, type GetBonuses } from './utils/bonus/getBonuses'
export { getAvailableFreebets, type GetAvailableFreebetsParams, type GetAvailableFreebetsResult, type GetAvailableFreebets } from './utils/bonus/getAvailableFreebets'
