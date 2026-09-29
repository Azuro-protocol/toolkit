import { afterEach, describe, expect, it, vi } from 'vitest'

import { activatePromoCode, type ActivatePromoCodeParams } from './activatePromoCode'
import { PromoCodeError, isPromoCodeError } from './promoCodeError'
import { type RawBonus } from './types'
import { getApiEndpoint } from '../getEndpoints'
import { BetRestrictionType, BonusStatus, BonusType, FreebetType, type Freebet } from '../../global'


const ACCOUNT = '0x0000000000000000000000000000000000000001'
const AFFILIATE = '0x0000000000000000000000000000000000000002'

const PARAMS: ActivatePromoCodeParams = {
  chainId: 137,
  code: 'SUMMER26',
  account: ACCOUNT,
  affiliate: AFFILIATE,
}

const polygonBonus: RawBonus = {
  id: 'bonus-1',
  bonusType: BonusType.FreeBet,
  freebetParam: {
    isBetSponsored: true,
    isFeeSponsored: false,
    isSponsoredBetReturnable: true,
    settings: {
      bonusType: FreebetType.OnlyWin,
      feeSponsored: false,
      betRestriction: {
        betType: BetRestrictionType.Ordinar,
        minOdds: '1.2',
        maxOdds: '5',
      },
      eventRestriction: {
        eventStatus: 'All',
      },
      periodOfValidityMs: 604800000,
    },
  },
  address: ACCOUNT,
  amount: '5000000',
  status: BonusStatus.Available,
  network: 'Polygon',
  currency: 'USDT',
  expiresAt: '2026-03-08T00:00:00.000Z',
  usedAt: '2026-03-02T00:00:00.000Z',
  createdAt: '2026-03-01T00:00:00.000Z',
  publicCustomData: { campaign: 'campaign-1' },
}

type FetchInit = {
  method: string
  headers: Record<string, string>
  body: string
}

const stubFetch = (status: number, statusText: string, body: string) => {
  let isBodyRead = false

  // like a real response, the body can be read only once
  const readBody = () => {
    if (isBodyRead) {
      throw new TypeError('Body has already been read')
    }

    isBodyRead = true

    return body
  }

  const fetchMock = vi.fn(async (_url: string, _init: FetchInit) => ({
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: async () => JSON.parse(readBody()),
    text: async () => readBody(),
  }))

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

const catchError = async (promise: Promise<unknown>): Promise<unknown> => {
  try {
    await promise
  }
  catch (error) {
    return error
  }

  throw new Error('Expected the promise to reject')
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('activatePromoCode', () => {
  it('sends the trimmed, upper-cased code and the addresses as they are', async () => {
    const fetchMock = stubFetch(201, 'Created', JSON.stringify(polygonBonus))

    await activatePromoCode({ ...PARAMS, code: '  summer26 ' })

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [ url, init ] = fetchMock.mock.calls[0]!

    expect(url).toBe(`${getApiEndpoint(137)}/bonus/promo-code/activate`)
    expect(init.method).toBe('POST')
    expect(init.headers).toStrictEqual({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
    expect(JSON.parse(init.body)).toStrictEqual({
      code: 'SUMMER26',
      bettorAddress: ACCOUNT,
      affiliate: AFFILIATE,
    })
  })

  it('returns the issued freebet with the amount in tokens', async () => {
    stubFetch(201, 'Created', JSON.stringify(polygonBonus))

    const freebet = await activatePromoCode(PARAMS)

    const expected: Freebet = {
      id: 'bonus-1',
      amount: '5',
      type: BonusType.FreeBet,
      params: {
        isBetSponsored: true,
        isFeeSponsored: false,
        isSponsoredBetReturnable: true,
      },
      settings: {
        type: FreebetType.OnlyWin,
        feeSponsored: false,
        betRestriction: {
          type: BetRestrictionType.Ordinar,
          minOdds: '1.2',
          maxOdds: '5',
        },
        eventRestriction: {
          state: undefined,
          eventFilter: undefined,
        },
        periodOfValidityMs: 604800000,
      },
      status: BonusStatus.Available,
      chainId: 137,
      expiresAt: 1772928000000,
      usedAt: 1772409600000,
      createdAt: 1772323200000,
      publicCustomData: { campaign: 'campaign-1' },
    }

    expect(freebet).toStrictEqual(expected)
  })

  it('returns the chain and token decimals of the freebet itself, not of the chain passed in', async () => {
    const baseBonus: RawBonus = {
      ...polygonBonus,
      id: 'bonus-2',
      amount: '2500000000000000000',
      network: 'Base',
      currency: 'WETH',
    }

    stubFetch(201, 'Created', JSON.stringify(baseBonus))

    const freebet = await activatePromoCode({ ...PARAMS, chainId: 137 })

    expect(freebet.chainId).toBe(8453)
    expect(freebet.amount).toBe('2.5')
  })

  it('calls the development API for a development chain', async () => {
    const amoyBonus: RawBonus = { ...polygonBonus, id: 'bonus-3', network: 'PolygonAmoy', currency: 'USDT' }
    const fetchMock = stubFetch(201, 'Created', JSON.stringify(amoyBonus))

    const freebet = await activatePromoCode({ ...PARAMS, chainId: 80002 })

    expect(getApiEndpoint(80002)).not.toBe(getApiEndpoint(137))
    expect(fetchMock.mock.calls[0]![0]).toBe(`${getApiEndpoint(80002)}/bonus/promo-code/activate`)
    expect(freebet.chainId).toBe(80002)
  })

  it.each([
    'bonus.promo_code_not_found',
    'bonus.promo_code_deactivated',
    'bonus.promo_code_expired',
    'bonus.promo_code_unavailable',
    'bonus.promo_code_affiliate_mismatch',
    'bonus.promo_code_already_activated',
    'bonus.promo_code_limit_reached',
    'bonus.promo_code_busy',
    'bonus.activate_promo_code_error',
  ])('keeps the reason %s of a 409', async (code) => {
    stubFetch(409, 'Conflict', JSON.stringify({ code, message: 'Promo code cannot be activated' }))

    const error = await catchError(activatePromoCode(PARAMS))

    expect(error).toBeInstanceOf(PromoCodeError)
    expect(isPromoCodeError(error)).toBe(true)
    expect(error).toMatchObject({ code, status: 409, message: 'Promo code cannot be activated' })
  })

  it('turns a 409 with a reason it does not know into unknown', async () => {
    stubFetch(409, 'Conflict', JSON.stringify({ code: 'bonus.something_else', message: 'Something else' }))

    const error = await catchError(activatePromoCode(PARAMS))

    expect(isPromoCodeError(error)).toBe(true)
    expect(error).toMatchObject({ code: 'unknown', status: 409, message: 'Something else' })
  })

  it('turns a validation error into unknown and joins its messages', async () => {
    stubFetch(400, 'Bad Request', JSON.stringify({
      message: [ 'first problem', 'second problem' ],
      error: 'Bad Request',
      statusCode: 400,
    }))

    const error = await catchError(activatePromoCode(PARAMS))

    expect(isPromoCodeError(error)).toBe(true)
    expect(error).toMatchObject({ code: 'unknown', status: 400, message: 'first problem, second problem' })
  })

  it('turns a server error with an HTML body into unknown without putting the body in the message', async () => {
    stubFetch(500, 'Internal Server Error', '<html><body>Bad Gateway</body></html>')

    const error = await catchError(activatePromoCode(PARAMS))

    expect(isPromoCodeError(error)).toBe(true)
    expect(error).toMatchObject({ code: 'unknown', status: 500, message: 'Status 500: Internal Server Error' })
    expect((error as PromoCodeError).message).not.toContain('<')
  })

  it('falls back to the bare status when the response has neither a body nor a status text', async () => {
    stubFetch(502, '', '')

    const error = await catchError(activatePromoCode(PARAMS))

    expect(error).toMatchObject({ code: 'unknown', status: 502, message: 'Status 502' })
  })

  it('lets a rejected fetch through unchanged', async () => {
    const networkError = new TypeError('Failed to fetch')

    vi.stubGlobal('fetch', vi.fn(async () => {
      throw networkError
    }))

    await expect(activatePromoCode(PARAMS)).rejects.toBe(networkError)
  })
})
