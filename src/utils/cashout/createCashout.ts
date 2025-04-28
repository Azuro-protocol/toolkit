import { type Hex, type Address } from 'viem'

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

type Props = {
  chainId: ChainId
  calculationId: string
  attention: string
  signature: Hex
}

export const createCashout = async (props: Props) => {
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

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: CreateCashoutResponse = await response.json()

  return data
}
