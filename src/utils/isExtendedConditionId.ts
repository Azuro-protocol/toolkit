/**
 * Determines if a condition is extended, i.e. its market and selection titles come with the condition from the API
 * rather than from the `@azuro-org/dictionaries` package.
 * The first digit of a condition id is the condition type: ids starting with 5 or 6 are both the extended type
 * (5 on older conditions), every other id is a legacy condition named from `@azuro-org/dictionaries`.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/utils/isExtendedConditionId
 *
 * @example
 * import { isExtendedConditionId } from '@azuro-org/toolkit'
 *
 * isExtendedConditionId('6001000000000000000000000000001') // true
 * isExtendedConditionId('1001000000000000000000000000001') // false
 * */
export const isExtendedConditionId = (conditionId: string): boolean => (
  conditionId[0] === '5' || conditionId[0] === '6'
)
