import { type Hex } from 'viem'

import { type ChainId, chainsData } from '../../config'


export enum CashoutState {
  Processing = 'PROCESSING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Open = 'OPEN'
}

export type CreateCashoutResponse = {
  id: string
  state: CashoutState
  errorMessage?: string
}

export type CreateCashoutResult = CreateCashoutResponse

export type CreateCashoutParams = {
  chainId: ChainId
  calculationId: string
  attention: string
  signature: Hex
}

/**
 * Creates a cashout order for an existing bet by submitting the signed cashout calculation to the Azuro API.
 * This finalizes the cashout process after obtaining a calculation and signing the typed data.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/utils/cashout/createCashout
 *
 * @example
 * import { createCashout } from '@azuro-org/toolkit'
 *
 * const chainId = 100
 * const calculationId = 'gnosis_0x123_456'
 * const attention = 'By signing this transaction, I agree to cash out on Azuro'
 * const signature = '0xabc...'
 *
 * const result = await createCashout({
 *   chainId,
 *   calculationId,
 *   attention,
 *   signature,
 * })
 *
 * console.log(result.state) // 'PROCESSING', 'ACCEPTED', 'REJECTED', or 'OPEN'
 * */
export const createCashout = async (props: CreateCashoutParams): Promise<CreateCashoutResult> => {
  const { chainId, calculationId, attention, signature } = props

  const { api, contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const signedCashout = {
    calculationId,
    signature: {
      verifyingContract: contracts.cashout.address,
      bettingContract: contracts.core.address,
      attention,
      chainId,
      ownerSignature: signature,
    },
  }

  const response = await fetch(`${api}/cashout/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signedCashout),
  })

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: CreateCashoutResponse = await response.json()

  return data
}
