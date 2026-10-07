import { ConditionStatus, OutcomeResult } from '../../docs/bets/types'


export type IsSelectionCanceledParams = {
  /** `V3_Selection.result` */
  selectionResult?: string | null
  /** `V3_Outcome.result` of the outcome the leg was placed on */
  outcomeResult?: string | null
  /** `V3_Condition.status` of the condition the leg was placed on */
  conditionStatus?: string | null
}

/**
 * Tells whether a single leg of a bet was voided.
 *
 * @deprecated a leg is voided exactly when its own selection result is `Canceled`: read
 * `selection.result === SelectionResult.Canceled` instead. The subgraph records that result on every
 * voided leg, whether its whole condition was canceled, its outcome alone was, the whole bet was
 * rejected or the leg alone was rejected from a combo. The outcome's result, which this function also
 * consults, is not a per-leg signal: a leg rejected from a combo keeps the Won or Lost its outcome
 * settled at.
 *
 * The params are widened to `string` so that any of the generated enums, or a plain string from
 * another source, can be passed in.
 *
 * @example
 * import { isSelectionCanceled } from '@azuro-org/toolkit'
 *
 * const isCanceled = isSelectionCanceled({
 *   selectionResult: selection.result,
 *   outcomeResult: selection.outcome.result,
 *   conditionStatus: selection.outcome.condition.status,
 * })
 * */
export const isSelectionCanceled = (props: IsSelectionCanceledParams): boolean => {
  const { selectionResult, outcomeResult, conditionStatus } = props

  return (
    outcomeResult === OutcomeResult.Canceled
    || selectionResult === OutcomeResult.Canceled
    || (!selectionResult && conditionStatus === ConditionStatus.Canceled)
  )
}
