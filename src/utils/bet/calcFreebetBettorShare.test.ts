import { parseUnits } from 'viem'
import { describe, expect, it } from 'vitest'

import { calcFreebetBettorShare } from './calcFreebetBettorShare'


const raw = (value: string): bigint => parseUnits(value, 6)

describe('calcFreebetBettorShare', () => {
  it('pays the payout less the stake on a returnable freebet', () => {
    expect(calcFreebetBettorShare({
      payout: raw('1.5'),
      amount: raw('1'),
      isAmountReturnable: true,
    })).toBe(raw('0.5'))
  })

  it('pays the whole payout on a non-returnable freebet', () => {
    expect(calcFreebetBettorShare({
      payout: raw('1.5'),
      amount: raw('1'),
      isAmountReturnable: false,
    })).toBe(raw('1.5'))
  })

  it('pays nothing when the payout equals the stake, whatever the flag', () => {
    // a canceled freebet pays back exactly its stake, and all of it goes to the freebet fund
    expect(calcFreebetBettorShare({ payout: raw('1'), amount: raw('1'), isAmountReturnable: true })).toBe(0n)
    expect(calcFreebetBettorShare({ payout: raw('1'), amount: raw('1'), isAmountReturnable: false })).toBe(0n)
  })

  it('pays nothing when the payout is below the stake, whatever the flag', () => {
    expect(calcFreebetBettorShare({ payout: raw('0.8'), amount: raw('1'), isAmountReturnable: true })).toBe(0n)
    expect(calcFreebetBettorShare({ payout: raw('0.8'), amount: raw('1'), isAmountReturnable: false })).toBe(0n)
  })

  it('pays nothing on a lost freebet, whose payout is 0', () => {
    expect(calcFreebetBettorShare({ payout: 0n, amount: raw('1'), isAmountReturnable: true })).toBe(0n)
    expect(calcFreebetBettorShare({ payout: 0n, amount: raw('1'), isAmountReturnable: false })).toBe(0n)
  })

  it('values a freebet with a null flag as returnable', () => {
    expect(calcFreebetBettorShare({
      payout: raw('1.5'),
      amount: raw('1'),
      isAmountReturnable: null,
    })).toBe(raw('0.5'))
  })

  it('values a freebet with no flag as returnable', () => {
    expect(calcFreebetBettorShare({ payout: raw('1.5'), amount: raw('1') })).toBe(raw('0.5'))
    expect(calcFreebetBettorShare({
      payout: raw('1.5'),
      amount: raw('1'),
      isAmountReturnable: undefined,
    })).toBe(raw('0.5'))
  })
})
