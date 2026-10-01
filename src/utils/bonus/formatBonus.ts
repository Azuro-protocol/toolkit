import { formatUnits } from 'viem'

import { chainsDataByEnv } from '../../config'
import { type Bonus, type ChainData } from '../../global'
import { type Environment } from '../../envs'
import { type RawBonus } from './types'


/**
 * Resolves the chain data of the environment a raw bonus was issued on, from its `network` and `currency`.
 * For an environment the toolkit does not know the result is `undefined` at runtime, so reading from it throws.
 * */
export const getBonusChainData = (rawBonus: RawBonus): ChainData => {
  const environment = `${rawBonus.network}${rawBonus.currency}` as Environment

  return chainsDataByEnv[environment]
}

/**
 * Maps a raw bonus to a `Bonus`. The amount is formatted with the decimals of the bet token of the bonus's own
 * environment, and `chainId` is that environment's chain.
 * */
export const formatBonus = (rawBonus: RawBonus): Bonus => {
  const { chain, betToken } = getBonusChainData(rawBonus)

  const {
    id,
    freebetParam: {
      isBetSponsored,
      isFeeSponsored,
      isSponsoredBetReturnable,
      settings,
    },
  } = rawBonus

  return {
    id,
    amount: formatUnits(BigInt(rawBonus.amount), betToken.decimals),
    type: rawBonus.bonusType,
    params: {
      isBetSponsored,
      isFeeSponsored,
      isSponsoredBetReturnable,
    },
    settings: {
      type: settings.bonusType,
      feeSponsored: settings.feeSponsored,
      betRestriction: {
        type: settings.betRestriction.betType === 'All' ? undefined : settings.betRestriction.betType,
        minOdds: settings.betRestriction.minOdds,
        maxOdds: settings.betRestriction?.maxOdds,
      },
      eventRestriction: {
        state: settings.eventRestriction.eventStatus === 'All' ? undefined : settings.eventRestriction.eventStatus,
        eventFilter: settings.eventRestriction.eventFilter,
      },
      periodOfValidityMs: settings.periodOfValidityMs,
    },
    status: rawBonus.status,
    chainId: chain.id,
    expiresAt: +new Date(rawBonus.expiresAt),
    usedAt: +new Date(rawBonus.usedAt),
    createdAt: +new Date(rawBonus.createdAt),
    publicCustomData: rawBonus.publicCustomData,
  }
}
