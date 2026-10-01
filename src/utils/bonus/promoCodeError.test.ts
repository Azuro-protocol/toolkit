import { describe, expect, it } from 'vitest'

import { PromoCodeError, isPromoCodeError } from './promoCodeError'


describe('PromoCodeError', () => {
  it('is an Error carrying the given name, code, message and status', () => {
    const error = new PromoCodeError('bonus.promo_code_busy', 'msg', { status: 409 })

    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('PromoCodeError')
    expect(error.code).toBe('bonus.promo_code_busy')
    expect(error.message).toBe('msg')
    expect(error.status).toBe(409)
    expect(isPromoCodeError(error)).toBe(true)
  })

  it('leaves status undefined when none is given', () => {
    const error = new PromoCodeError('unknown', 'msg')

    expect(error.status).toBeUndefined()
  })

  it('passes the cause on to Error', () => {
    const cause = new Error('inner')
    const error = new PromoCodeError('unknown', 'msg', { cause })

    expect(error.cause).toBe(cause)
  })
})

describe('isPromoCodeError', () => {
  it('accepts a plain object with the same name and code, as thrown by another copy of the library', () => {
    expect(isPromoCodeError({ name: 'PromoCodeError', code: 'bonus.promo_code_expired', message: 'x' })).toBe(true)
  })

  it('accepts the unknown code', () => {
    expect(isPromoCodeError({ name: 'PromoCodeError', code: 'unknown', message: 'x' })).toBe(true)
  })

  it('rejects an ordinary Error', () => {
    expect(isPromoCodeError(new Error('x'))).toBe(false)
  })

  it('rejects values that are not objects', () => {
    expect(isPromoCodeError(null)).toBe(false)
    expect(isPromoCodeError(undefined)).toBe(false)
    expect(isPromoCodeError('PromoCodeError')).toBe(false)
  })

  it('rejects a code it does not know', () => {
    expect(isPromoCodeError({ name: 'PromoCodeError', code: 'bonus.something_else', message: 'x' })).toBe(false)
  })

  it('rejects a known code under another name', () => {
    expect(isPromoCodeError({ name: 'Error', code: 'bonus.promo_code_expired', message: 'x' })).toBe(false)
  })
})
