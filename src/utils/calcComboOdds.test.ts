import { describe, expect, it } from 'vitest'

import { calcComboOdds } from './calcComboOdds'
import { MARGIN_APPLIED_AT } from '../config'


describe('calcComboOdds', () => {
  it('removes the fee from every leg and re-applies it once to the product', () => {
    // ceil(2 / 0.99) * ceil(1.5 / 0.99) * 0.99 = 3.05, where the plain product would be 3
    expect(+calcComboOdds({ odds: [ 2, 1.5 ], createdAt: MARGIN_APPLIED_AT })).toBe(3.05)
  })

  it('leaves a single leg at its own odds, because the fee comes straight back off it', () => {
    expect(+calcComboOdds({ odds: [ 1.68 ], createdAt: MARGIN_APPLIED_AT })).toBe(1.68)
  })

  it('multiplies legs placed before the fee as they are', () => {
    expect(+calcComboOdds({ odds: [ 2, 1.5 ], createdAt: MARGIN_APPLIED_AT - 1 })).toBe(3)
  })

  it('compounds the difference over the legs, so a longer combo diverges further', () => {
    const odds = [ 1.2, 1.3, 1.4, 1.5 ]

    // ceil(1.2/.99) * ceil(1.3/.99) * ceil(1.4/.99) * ceil(1.5/.99) * 0.99
    expect(+calcComboOdds({ odds, createdAt: MARGIN_APPLIED_AT })).toBe(3.44)
    // 1.2 * 1.3 * 1.4 * 1.5, with no fee to remove
    expect(+calcComboOdds({ odds, createdAt: MARGIN_APPLIED_AT - 1 })).toBe(3.276)
  })

  it('prices nothing at 1, so a bet with no leg left standing returns its stake', () => {
    // `calcMinOdds` of an empty list is the bare combo fee, which would hand back 99% of the stake
    expect(+calcComboOdds({ odds: [], createdAt: MARGIN_APPLIED_AT })).toBe(1)
    expect(+calcComboOdds({ odds: [], createdAt: MARGIN_APPLIED_AT - 1 })).toBe(1)
  })
})
