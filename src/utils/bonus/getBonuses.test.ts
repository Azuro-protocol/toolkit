import { afterEach, describe, expect, it, vi } from 'vitest'

import { getBonuses, type RawBonus } from './getBonuses'
import { chainsData } from '../../config'
import { BetRestrictionType, BonusStatus, BonusType, EventRestrictionState, FreebetType, type Bonus } from '../../global'


const ACCOUNT = '0x0000000000000000000000000000000000000001'
const AFFILIATE = '0x0000000000000000000000000000000000000002'

const polygonBonus: RawBonus = {
  id: 'bonus-1',
  bonusType: BonusType.FreeBet,
  freebetParam: {
    isBetSponsored: true,
    isFeeSponsored: true,
    isSponsoredBetReturnable: true,
    settings: {
      bonusType: FreebetType.OnlyWin,
      feeSponsored: true,
      betRestriction: {
        betType: 'All',
        minOdds: '1.1',
      },
      eventRestriction: {
        eventStatus: 'All',
      },
      periodOfValidityMs: 86400000,
    },
  },
  address: ACCOUNT,
  amount: '5000000',
  status: BonusStatus.Available,
  network: 'Polygon',
  currency: 'USDT',
  expiresAt: '2026-01-02T00:00:00.000Z',
  usedAt: '2026-01-01T12:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  publicCustomData: null,
}

const baseBonus: RawBonus = {
  id: 'bonus-2',
  bonusType: BonusType.FreeBet,
  freebetParam: {
    isBetSponsored: true,
    isFeeSponsored: true,
    isSponsoredBetReturnable: true,
    settings: {
      bonusType: FreebetType.AllWin,
      feeSponsored: false,
      betRestriction: {
        betType: BetRestrictionType.Combo,
        minOdds: '1.5',
        maxOdds: '10',
      },
      eventRestriction: {
        eventStatus: EventRestrictionState.Live,
        eventFilter: {
          exclude: true,
          filter: [
            {
              sportId: '1',
              leagues: [ 'league-1', 'league-2' ],
              markets: [
                { marketId: 1, gamePeriodId: 2, gameTypeId: 3 },
              ],
            },
          ],
        },
      },
      periodOfValidityMs: 86400000,
    },
  },
  address: ACCOUNT,
  amount: '1500000000000000000',
  status: BonusStatus.Used,
  network: 'Base',
  currency: 'WETH',
  expiresAt: '2026-02-02T00:00:00.000Z',
  usedAt: '2026-02-01T18:30:00.000Z',
  createdAt: '2026-02-01T00:00:00.000Z',
  publicCustomData: { campaign: 'campaign-1' },
}

const response = { bonuses: [ polygonBonus, baseBonus ] }

type FetchInit = {
  method: string
  headers: Record<string, string>
  body: string
}

const stubFetch = (status: number, statusText: string, body?: unknown) => {
  const fetchMock = vi.fn(async (_url: string, _init: FetchInit) => ({
    ok: status >= 200 && status < 300,
    status,
    statusText,
    // a round trip through JSON, so the fixtures reach the code the way a response body would
    json: async () => JSON.parse(JSON.stringify(body)),
  }))

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getBonuses', () => {
  it('returns the bonus on the requested chain and maps an unrestricted bonus', async () => {
    const fetchMock = stubFetch(200, 'OK', response)

    const bonuses = await getBonuses({ chainId: 137, account: ACCOUNT, affiliate: AFFILIATE })

    const expected: Bonus[] = [
      {
        id: 'bonus-1',
        amount: '5',
        type: BonusType.FreeBet,
        params: {
          isBetSponsored: true,
          isFeeSponsored: true,
          isSponsoredBetReturnable: true,
        },
        settings: {
          type: FreebetType.OnlyWin,
          feeSponsored: true,
          betRestriction: {
            type: undefined,
            minOdds: '1.1',
            maxOdds: undefined,
          },
          eventRestriction: {
            state: undefined,
            eventFilter: undefined,
          },
          periodOfValidityMs: 86400000,
        },
        status: BonusStatus.Available,
        chainId: 137,
        expiresAt: 1767312000000,
        usedAt: 1767268800000,
        createdAt: 1767225600000,
        publicCustomData: null,
      },
    ]

    expect(bonuses).toStrictEqual(expected)

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [ url, init ] = fetchMock.mock.calls[0]!

    expect(url).toBe(`${chainsData[137].api}/bonus/get-by-addresses`)
    expect(init.method).toBe('POST')
    expect(init.headers).toStrictEqual({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
    expect(JSON.parse(init.body)).toStrictEqual({
      bettorAddress: ACCOUNT,
      poolAddress: AFFILIATE,
      status: 'Available',
    })
  })

  it('carries concrete restrictions, the event filter and custom data through, and sends the status', async () => {
    const fetchMock = stubFetch(200, 'OK', response)

    const bonuses = await getBonuses({
      chainId: 8453,
      account: ACCOUNT,
      affiliate: AFFILIATE,
      bonusStatus: BonusStatus.Used,
    })

    const expected: Bonus[] = [
      {
        id: 'bonus-2',
        amount: '1.5',
        type: BonusType.FreeBet,
        params: {
          isBetSponsored: true,
          isFeeSponsored: true,
          isSponsoredBetReturnable: true,
        },
        settings: {
          type: FreebetType.AllWin,
          feeSponsored: false,
          betRestriction: {
            type: BetRestrictionType.Combo,
            minOdds: '1.5',
            maxOdds: '10',
          },
          eventRestriction: {
            state: EventRestrictionState.Live,
            eventFilter: {
              exclude: true,
              filter: [
                {
                  sportId: '1',
                  leagues: [ 'league-1', 'league-2' ],
                  markets: [
                    { marketId: 1, gamePeriodId: 2, gameTypeId: 3 },
                  ],
                },
              ],
            },
          },
          periodOfValidityMs: 86400000,
        },
        status: BonusStatus.Used,
        chainId: 8453,
        expiresAt: 1769990400000,
        usedAt: 1769970600000,
        createdAt: 1769904000000,
        publicCustomData: { campaign: 'campaign-1' },
      },
    ]

    expect(bonuses).toStrictEqual(expected)

    const [ url, init ] = fetchMock.mock.calls[0]!

    expect(url).toBe(`${chainsData[8453].api}/bonus/get-by-addresses`)
    expect(JSON.parse(init.body)).toStrictEqual({
      bettorAddress: ACCOUNT,
      poolAddress: AFFILIATE,
      status: 'Used',
    })
  })

  it('returns an empty list, not null, when every bonus in the response is on another chain', async () => {
    stubFetch(200, 'OK', response)

    const bonuses = await getBonuses({ chainId: 80002, account: ACCOUNT, affiliate: AFFILIATE })

    expect(bonuses).toStrictEqual([])
  })

  it('rejects the whole read when a bonus is on an environment the toolkit does not know', async () => {
    const unknownBonus: RawBonus = { ...polygonBonus, id: 'bonus-3', network: 'Unknown', currency: 'TOKEN' }

    stubFetch(200, 'OK', { bonuses: [ polygonBonus, unknownBonus ] })

    await expect(getBonuses({ chainId: 137, account: ACCOUNT, affiliate: AFFILIATE }))
      .rejects.toBeInstanceOf(TypeError)
  })

  it('returns null on a 404', async () => {
    stubFetch(404, 'Not Found')

    const bonuses = await getBonuses({ chainId: 137, account: ACCOUNT, affiliate: AFFILIATE })

    expect(bonuses).toBe(null)
  })

  it('throws with the status and status text on any other failed response', async () => {
    stubFetch(500, 'Internal Server Error')

    await expect(getBonuses({ chainId: 137, account: ACCOUNT, affiliate: AFFILIATE }))
      .rejects.toThrow(/^Status 500: Internal Server Error$/)
  })
})
