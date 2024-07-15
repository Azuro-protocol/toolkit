import { type Hex } from 'viem'

import { deBridgeTxUrl } from '../../config'


export enum DeBridgeOrderStatus {
  None = 'None',
  Created = 'Created',
  Fulfilled = 'Fulfilled',
  SentUnlock = 'SentUnlock',
  OrderCancelled = 'OrderCancelled',
  SentOrderCancel = 'SentOrderCancel',
  ClaimedUnlock = 'ClaimedUnlock',
  ClaimedOrderCancel = 'ClaimedOrderCancel',
}

export enum DeBridgeExternalCallStatus {
  NoExtCall = 'NoExtCall',
  AwaitingOrderFulfillment = 'AwaitingOrderFulfillment',
  AwaitingExecution = 'AwaitingExecution',
  Executing = 'Executing',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
}

type OrderStatusResponse = {
  orderId: {
    stringValue: Hex
  }
  fulfilledDstEventMetadata: {
    transactionHash: {
      stringValue: Hex
    }
  } | null
  state: DeBridgeOrderStatus
  externalCallState: DeBridgeExternalCallStatus
  takeOfferWithMetadata: {
    chainId: {
      bigIntegerValue: number
    }
  }
}


export const getDeBridgeOrder = async (orderId: Hex) => {
  const response = await fetch(`${deBridgeTxUrl}/orders/${orderId}?t=${Date.now()}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Status ${response.status}: ${response.statusText}`)
  }

  const data: OrderStatusResponse = await response.json()

  return data
}
