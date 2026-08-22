import { describe, expect, it } from 'vitest'

import { isSelectionCanceled } from './isSelectionCanceled'


describe('isSelectionCanceled', () => {
  it('reads a per-outcome void, whose condition stays resolved', () => {
    expect(isSelectionCanceled({
      selectionResult: null,
      outcomeResult: 'Canceled',
      conditionStatus: 'Resolved',
    })).toBe(true)
  })

  it('reads a whole-condition cancel, which predates per-outcome results', () => {
    expect(isSelectionCanceled({
      selectionResult: null,
      outcomeResult: null,
      conditionStatus: 'Canceled',
    })).toBe(true)
  })

  it('reads the per-selection signal, which the generated enum has no member for yet', () => {
    expect(isSelectionCanceled({
      selectionResult: 'Canceled',
      outcomeResult: null,
      conditionStatus: 'Resolved',
    })).toBe(true)
  })

  it('trusts a settled selection over its condition, which can be canceled and re-resolved', () => {
    expect(isSelectionCanceled({
      selectionResult: 'Won',
      outcomeResult: 'Won',
      conditionStatus: 'Canceled',
    })).toBe(false)
  })

  it('leaves a settled or still running leg alone', () => {
    expect(isSelectionCanceled({
      selectionResult: 'Won',
      outcomeResult: 'Won',
      conditionStatus: 'Resolved',
    })).toBe(false)

    expect(isSelectionCanceled({
      selectionResult: null,
      outcomeResult: null,
      conditionStatus: 'Created',
    })).toBe(false)

    expect(isSelectionCanceled({})).toBe(false)
  })
})
