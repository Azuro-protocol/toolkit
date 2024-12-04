import { chainsData, type ChainId } from '../../config'
import { type CreateCashoutResponse } from './createCashout'


export type GetCashoutResponse = {
  txHash: string
} & CreateCashoutResponse

type Props = {
  chainId: ChainId
  orderId: string
}

export const getCashout = async ({ chainId, orderId }: Props) => {
  const { api, contracts } = chainsData[chainId]

  if (!contracts.cashout?.address) {
    throw new Error('provided chainId is not supported for cashout')
  }

  const response = await fetch(`${api}/cashout/${orderId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: GetCashoutResponse = await response.json()

  return data
}
