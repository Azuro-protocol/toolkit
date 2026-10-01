/**
 * Reasons the API gives when it rejects a promo code activation.
 * */
export const promoCodeActivationErrorCodes = [
  'bonus.promo_code_not_found',
  'bonus.promo_code_deactivated',
  'bonus.promo_code_expired',
  'bonus.promo_code_unavailable',
  'bonus.promo_code_affiliate_mismatch',
  'bonus.promo_code_already_activated',
  'bonus.promo_code_limit_reached',
  'bonus.promo_code_busy',
  'bonus.activate_promo_code_error',
] as const

/**
 * Machine-readable reason of a failed promo code activation.
 *
 * - `bonus.promo_code_not_found` — no such promo code.
 * - `bonus.promo_code_deactivated` — the promo code was deactivated.
 * - `bonus.promo_code_expired` — the promo code has expired.
 * - `bonus.promo_code_unavailable` — the promo code is unavailable.
 * - `bonus.promo_code_affiliate_mismatch` — the promo code belongs to another affiliate.
 * - `bonus.promo_code_already_activated` — this address has already activated the promo code.
 * - `bonus.promo_code_limit_reached` — the promo code has reached its activation limit.
 * - `bonus.promo_code_busy` — the activation is being processed by another request; safe to retry.
 * - `bonus.activate_promo_code_error` — the activation failed.
 * - `unknown` — anything else: input rejected by validation, a server error, an unrecognized reason
 *   or a response that can't be read. The error carries the HTTP status and the server's message
 *   when available.
 * */
export type PromoCodeErrorCode = typeof promoCodeActivationErrorCodes[number] | 'unknown'

/**
 * Error thrown when a promo code activation fails.
 * Branch on `code` rather than on `message`, and recognize the error with `isPromoCodeError`.
 *
 * @example
 * import { activatePromoCode, isPromoCodeError } from '@azuro-org/toolkit'
 *
 * try {
 *   await activatePromoCode(params)
 * }
 * catch (error) {
 *   if (isPromoCodeError(error) && error.code === 'bonus.promo_code_expired') {
 *     showMessage('This promo code has expired')
 *   }
 * }
 * */
export class PromoCodeError extends Error {
  code: PromoCodeErrorCode
  /** HTTP status of the response, when there was one */
  status?: number

  constructor(code: PromoCodeErrorCode, message: string, options?: { status?: number, cause?: unknown }) {
    super(message, options as ErrorOptions)
    this.code = code
    this.status = options?.status
    this.name = 'PromoCodeError'
  }
}

const promoCodeErrorCodes: readonly unknown[] = [ ...promoCodeActivationErrorCodes, 'unknown' ]

/**
 * Checks whether an error is a `PromoCodeError` with a known `code`.
 * It compares `name` and `code` instead of using `instanceof`, so the check still holds
 * when two copies of the library end up in one bundle.
 *
 * @example
 * import { isPromoCodeError } from '@azuro-org/toolkit'
 *
 * if (isPromoCodeError(error)) {
 *   console.log(error.code, error.status)
 * }
 * */
export const isPromoCodeError = (error: unknown): error is PromoCodeError => {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const { name, code } = error as { name?: unknown, code?: unknown }

  return name === 'PromoCodeError' && promoCodeErrorCodes.includes(code)
}
