import { describe, expect, it } from 'vitest'

import { isOutcomeSettled } from './isOutcomeSettled'
import { OutcomeState } from '../global'


describe('isOutcomeSettled', () => {
  it('settles a won or lost outcome', () => {
    expect(isOutcomeSettled(OutcomeState.Won)).toBe(true)
    expect(isOutcomeSettled(OutcomeState.Lost)).toBe(true)
  })

  it('settles a voided outcome, which is final with money attached', () => {
    expect(isOutcomeSettled(OutcomeState.Canceled)).toBe(true)
  })

  it('leaves an active outcome unsettled', () => {
    expect(isOutcomeSettled(OutcomeState.Active)).toBe(false)
  })

  it('leaves a stopped outcome unsettled: it is not offered right now, not resolved', () => {
    // `Stopped` is also what an outcome missing from the feed reads as, so it must never settle
    expect(isOutcomeSettled(OutcomeState.Stopped)).toBe(false)
  })

  it('covers every member of the enum, so a new state cannot be silently unhandled', () => {
    const states = Object.values(OutcomeState)
    const settled = states.filter(isOutcomeSettled)

    expect(states).toHaveLength(5)
    expect(settled.sort()).toEqual([ OutcomeState.Canceled, OutcomeState.Lost, OutcomeState.Won ].sort())
  })
})
