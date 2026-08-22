import { OutcomeState } from '../global'


/**
 * Determines if an outcome has been settled, i.e. it has reached a final state and can no longer be bet on.
 * Returns true for won, lost and canceled (voided) outcomes, false for active and stopped ones.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/utils/isOutcomeSettled
 *
 * @example
 * import { isOutcomeSettled, OutcomeState } from '@azuro-org/toolkit'
 *
 * isOutcomeSettled(OutcomeState.Won) // true
 * isOutcomeSettled(OutcomeState.Active) // false
 * */
export const isOutcomeSettled = (state: OutcomeState): boolean => (
  state === OutcomeState.Won || state === OutcomeState.Lost || state === OutcomeState.Canceled
)
