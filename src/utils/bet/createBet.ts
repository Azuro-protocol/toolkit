import { type Address, type Hex } from 'viem'

import { chainsData } from '../../config'
import { type CreateBetResponse, type BetClientData } from '../../global'


export type CreateBetParams = {
  account: Address
  clientData: BetClientData
  bet: {
    conditionId: string | bigint
    outcomeId: string | number | bigint
    minOdds: string | bigint
    amount: string | bigint
    nonce: string | number | bigint
  }
  signature: Hex
  bonusId?: string
}

export type CreateBetResult = CreateBetResponse

/**
 * Creates a single (ordinary) bet by submitting signed bet data to the Azuro API.
 * This function sends the bet order to the relayer which will then place the bet on-chain.
 *
 * - Docs: https://dev-gem.azuro.org/hub/apps/toolkit/bet/createBet
 *
 * @example
 * import { createBet } from '@azuro-org/toolkit'
 *
 * const account = '0x...'
 * const clientData = { chainId: 137, core: '0x...', ... }
 * const bet = {
 *   conditionId: '1',
 *   outcomeId: '1',
 *   minOdds: '1500000000000',
 *   amount: '1000000',
 *   nonce: '1',
 * }
 * const signature = '0x...'
 *
 * const result = await createBet({ account, clientData, bet, signature })
 * */
export const createBet = async (props: CreateBetParams): Promise<CreateBetResult> => {
  const { account, clientData, bet, signature, bonusId } = props

  const { chainId } = clientData
  const { api, environment } = chainsData[chainId]

  const signedBet = {
    environment,
    bonusId,
    bettor: account.toLowerCase(),
    betOwner: account.toLowerCase(),
    clientBetData: {
      clientData,
      bet: {
        conditionId: String(bet.conditionId),
        outcomeId: Number(bet.outcomeId),
        minOdds: String(bet.minOdds),
        amount: String(bet.amount),
        nonce: String(bet.nonce),
      },
    },
    bettorSignature: signature,
  }

  const response = await fetch(`${api}/bet/orders/ordinar`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signedBet),
  })

  const data: CreateBetResponse = await response.json()

  if (!response.ok) {
    const error = new Error(data?.errorMessage || `Status: ${response.status}`)

    if (data?.error) {
      error.cause = new Error(data.error)
    }

    throw error
  }

  return data
}
