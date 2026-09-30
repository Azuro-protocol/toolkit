import { type Address } from 'viem'

import { type ChainId } from '../../config'
import { type Freebet } from '../../global'
import { getApiEndpoint } from '../getEndpoints'
import { formatBonus } from './formatBonus'
import { PromoCodeError, promoCodeActivationErrorCodes, type PromoCodeErrorCode } from './promoCodeError'
import { type RawBonus } from './types'


export type ActivatePromoCodeParams = {
  chainId: ChainId
  code: string
  account: Address
  affiliate: Address
}

export type ActivatePromoCodeResult = Freebet

type ErrorBody = {
  code?: unknown
  message?: unknown
}

const knownErrorCodes: readonly unknown[] = promoCodeActivationErrorCodes

const isActivationErrorCode = (code: unknown): code is Exclude<PromoCodeErrorCode, 'unknown'> => (
  knownErrorCodes.includes(code)
)

const readErrorBody = async (response: Response): Promise<ErrorBody | null> => {
  try {
    const body: unknown = JSON.parse(await response.text())

    return typeof body === 'object' && body !== null ? body as ErrorBody : null
  }
  catch {
    return null
  }
}

const getServerMessage = (message: unknown): string | undefined => {
  if (typeof message === 'string') {
    return message
  }

  if (Array.isArray(message) && message.every((item) => typeof item === 'string')) {
    return message.join(', ')
  }

  return undefined
}

const createPromoCodeError = async (response: Response): Promise<PromoCodeError> => {
  const { status, statusText } = response
  const body = await readErrorBody(response)
  const code = body?.code
  const message = getServerMessage(body?.message)
    || (statusText ? `Status ${status}: ${statusText}` : `Status ${status}`)

  if (status === 409 && isActivationErrorCode(code)) {
    return new PromoCodeError(code, message, { status })
  }

  return new PromoCodeError('unknown', message, { status })
}

/**
 * Activates a promo code for a bettor and returns the freebet it grants.
 * `chainId` picks the API environment (production or development) to call, while the returned freebet's
 * `chainId` is the chain the freebet was issued on, which can differ from it.
 *
 * Once the API has responded, every failure is a `PromoCodeError` carrying the HTTP status: its `code` names
 * the reason when the activation is rejected, and is `unknown` for any other error status or for a success
 * response that can't be read. A network failure, where no response arrives, rejects with the error `fetch`
 * threw.
 *
 * - Docs: https://gem.azuro.org/hub/apps/toolkit/bonus/activatePromoCode
 *
 * @example
 * import { activatePromoCode, isPromoCodeError } from '@azuro-org/toolkit'
 *
 * try {
 *   const freebet = await activatePromoCode({
 *     chainId: 137,
 *     code: 'SUMMER26',
 *     account: '0x0000000000000000000000000000000000000001',
 *     affiliate: '0x0000000000000000000000000000000000000002',
 *   })
 *
 *   console.log(freebet.amount, freebet.chainId)
 * }
 * catch (error) {
 *   if (isPromoCodeError(error) && error.code === 'bonus.promo_code_already_activated') {
 *     console.log('This promo code has already been activated')
 *   }
 * }
 * */
export const activatePromoCode = async (props: ActivatePromoCodeParams): Promise<ActivatePromoCodeResult> => {
  const { chainId, code, account, affiliate } = props

  const response = await fetch(`${getApiEndpoint(chainId)}/bonus/promo-code/activate`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code.trim().toUpperCase(),
      bettorAddress: account,
      affiliate,
    }),
  })

  if (!response.ok) {
    throw await createPromoCodeError(response)
  }

  // a body that isn't JSON, an amount that isn't an integer, or a network and currency pair the toolkit
  // doesn't know all make the response unreadable
  try {
    const rawBonus: RawBonus = await response.json()

    return formatBonus(rawBonus)
  }
  catch (error) {
    throw new PromoCodeError('unknown', `Status ${response.status}: the response could not be read`, {
      status: response.status,
      cause: error,
    })
  }
}
