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
 * Resolution is per-outcome: one leg can be voided while its condition stays `Resolved`, so the
 * outcome's own `result` is the authoritative signal and the condition's status is only a fallback
 * for whole-condition cancels, which predate per-outcome results. `selection.result` is the
 * subgraph's newest per-selection signal and is only populated for data indexed after that fix, so
 * it cannot replace either of the other two checks.
 *
 * The params are widened to `string` on purpose: the generated `SelectionResult` enum has no
 * `Canceled` member even though the subgraph already returns that value.
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
