import type { BetRestrictionType, BonusStatus, BonusType, EventRestrictionState, FreebetType } from '../../global'


/** A bonus as the bonus API returns it. */
export type RawBonus = {
  id: string
  bonusType: BonusType
  freebetParam: {
    isBetSponsored: boolean
    isFeeSponsored: boolean
    isSponsoredBetReturnable: boolean
    settings: {
      bonusType: FreebetType
      feeSponsored: boolean
      betRestriction: {
        betType: BetRestrictionType | 'All'
        minOdds: string
        maxOdds?: string
      }
      eventRestriction: {
        eventStatus: EventRestrictionState | 'All'
        eventFilter?: {
          exclude: boolean
          filter: [
            {
              sportId: string
              leagues: string[]
              markets: {
                marketId: number
                gamePeriodId: number
                gameTypeId: number
              }[]
            }
          ]
        }
      }
      periodOfValidityMs: number
    }
  }
  address: string
  amount: string
  status: BonusStatus
  network: string
  currency: string
  expiresAt: string
  usedAt: string
  createdAt: string
  publicCustomData: Record<string, string> | null
}
